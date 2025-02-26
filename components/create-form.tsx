'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';
import React from 'react';
import { AgentFormFields } from './agent-form-fields';

const formSchema = z.object({
  name: z.string().min(3, "게임 이름은 최소 3자 이상이어야 합니다"),
  topic: z.string().min(5, "토론 주제는 최소 5자 이상이어야 합니다"),
  agentA: z.object({
    name: z.string().min(2, "AI 이름은 최소 2자 이상이어야 합니다"),
    character: z.string().min(10, "캐릭터 설명은 최소 10자 이상이어야 합니다"),
    address: z.string().min(1, "주소를 입력해주세요")
  }),
  agentB: z.object({
    name: z.string().min(2, "AI 이름은 최소 2자 이상이어야 합니다"),
    character: z.string().min(10, "캐릭터 설명은 최소 10자 이상이어야 합니다"),
    address: z.string().min(1, "주소를 입력해주세요")
  }),
});

const CONTRACT_ADDRESS = "0x18693562f4ced0fd77d6b42416003a5945d15358431fbff2b9af0e4b0759d261";

export const CreateForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [agentATags, setAgentATags] = useState<string[]>([]);
  const [agentBTags, setAgentBTags] = useState<string[]>([]);
  const [agentACharacter, setAgentACharacter] = useState('');
  const [agentBCharacter, setAgentBCharacter] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      topic: "",
      agentA: { name: "", character: "", address: "" },
      agentB: { name: "", character: "", address: "" },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      
      if (!window.aptos) {
        toast({ variant: 'destructive', title: "Aptos 지갑을 설치해주세요" });
        return;
      }

      const { address } = await window.aptos.connect();
      
      const transaction = {
        payload: {
          type: "entry_function_payload",
          function: `${CONTRACT_ADDRESS}::ai_debate_v4::create_debate`,
          type_arguments: [],
          arguments: [
            values.name,
            values.topic,
            values.agentA.name,
            values.agentA.character,
            values.agentA.address,
            values.agentB.name,
            values.agentB.character,
            values.agentB.address,
          ],
        }
      };

      const response = await window.aptos.signAndSubmitTransaction(transaction);
      console.log('Transaction Response:', response);
      toast({ title: "디베이트 생성 성공" });
    } catch (error) {
      console.error('Error details:', error);
      toast({ variant: 'destructive', title: "디베이트 생성 실패" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Create Event" description="" />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>게임 이름</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="게임 이름을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>토론 주제</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="토론할 주제를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AgentFormFields
              form={form}
              type="A"
              tags={agentATags}
              onAddTag={(type, value) => {
                if (value) {
                  if (!value.startsWith('#')) value = '#' + value;
                  setAgentATags([...agentATags, value]);
                }
              }}
              onRemoveTag={(type, index) => {
                setAgentATags(agentATags.filter((_, i) => i !== index));
              }}
              onCharacterChange={(value) => setAgentACharacter(value)}
              requireAddress={true}
            />

            <AgentFormFields
              form={form}
              type="B"
              tags={agentBTags}
              onAddTag={(type, value) => {
                if (value) {
                  if (!value.startsWith('#')) value = '#' + value;
                  setAgentBTags([...agentBTags, value]);
                }
              }}
              onRemoveTag={(type, index) => {
                setAgentBTags(agentBTags.filter((_, i) => i !== index));
              }}
              onCharacterChange={(value) => setAgentBCharacter(value)}
              requireAddress={true}
            />
          </div>

          <Button disabled={loading} className="w-full" type="submit">
            디베이트 생성하기
          </Button>
        </form>
      </Form>
    </>
  );
};
