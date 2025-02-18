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
import WNW_ABI from '@/abi/IWNW.abi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';
import React from 'react';
import { useWriteContract } from 'wagmi';
import { AgentFormFields } from './agent-form-fields';

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  agentA: z.object({
    character: z.string(),
    personality: z.string(),
    tag: z.string()
  }),
  agentB: z.object({
    character: z.string(),
    personality: z.string(),
    tag: z.string()
  }),
  duration: z.number().min(1, "진행 시간을 설정해주세요"),
  minBet: z.number().min(0, "최소 베팅 금액을 설정해주세요"),
});

export const CreateForm = () => {
  const { toast } = useToast();
  const { writeContract } = useWriteContract();
  const [loading, setLoading] = useState(false);
  const [agentAPersonalities, setAgentAPersonalities] = useState<string[]>([]);
  const [agentBPersonalities, setAgentBPersonalities] = useState<string[]>([]);
  const [agentATags, setAgentATags] = useState<string[]>([]);
  const [agentBTags, setAgentBTags] = useState<string[]>([]);
  const [agentACharacter, setAgentACharacter] = useState('');
  const [agentBCharacter, setAgentBCharacter] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      agentA: { character: '', personality: '', tag: '' },
      agentB: { character: '', personality: '', tag: '' },
      duration: 5,
      minBet: 0.1
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await writeContract({
        address: '0xe31bA092390628Aaf5faFda2F50bFD7d51C9e657',
        abi: WNW_ABI,
        functionName: 'createGame',
        args: [
          data.duration * 60,
          BigInt(Math.floor(data.minBet * 10 ** 18)),
          data.title,
          JSON.stringify({
            description: '',
            agents: {
              A: { ...data.agentA, personalities: agentAPersonalities, tags: agentATags },
              B: { ...data.agentB, personalities: agentBPersonalities, tags: agentBTags }
            }
          })
        ]
      });
      toast({ title: "게임 생성 성공" });
    } catch (error) {
      toast({ variant: 'destructive', title: "게임 생성 실패" });
    } finally {
      setLoading(false);
    }
  };

  const addPersonality = (agent: 'A' | 'B', personality: string) => {
    if (!personality) return;
    if (agent === 'A') {
      setAgentAPersonalities([...agentAPersonalities, personality]);
      form.setValue('agentA.personality', '');
    } else {
      setAgentBPersonalities([...agentBPersonalities, personality]);
      form.setValue('agentB.personality', '');
    }
  };

  const addTag = (agent: 'A' | 'B', tag: string) => {
    if (!tag) return;
    if (!tag.startsWith('#')) tag = '#' + tag;
    if (agent === 'A') {
      setAgentATags([...agentATags, tag]);
      form.setValue('agentA.tag', '');
    } else {
      setAgentBTags([...agentBTags, tag]);
      form.setValue('agentB.tag', '');
    }
  };

  const removePersonality = (agent: 'A' | 'B', index: number) => {
    if (agent === 'A') {
      setAgentAPersonalities(agentAPersonalities.filter((_, i) => i !== index));
    } else {
      setAgentBPersonalities(agentBPersonalities.filter((_, i) => i !== index));
    }
  };

  const removeTag = (agent: 'A' | 'B', index: number) => {
    if (agent === 'A') {
      setAgentATags(agentATags.filter((_, i) => i !== index));
    } else {
      setAgentBTags(agentBTags.filter((_, i) => i !== index));
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>토론 주제</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="예: 비트코인이 이번 주에 5만불을 돌파할 것인가?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AgentFormFields
              form={form}
              type="A"
              personalities={agentAPersonalities}
              tags={agentATags}
              onAddPersonality={addPersonality}
              onAddTag={addTag}
              onRemovePersonality={removePersonality}
              onRemoveTag={removeTag}
              onCharacterChange={(value) => setAgentACharacter(value)}
            />

            <AgentFormFields
              form={form}
              type="B"
              personalities={agentBPersonalities}
              tags={agentBTags}
              onAddPersonality={addPersonality}
              onAddTag={addTag}
              onRemovePersonality={removePersonality}
              onRemoveTag={removeTag}
              onCharacterChange={(value) => setAgentBCharacter(value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>진행 시간 (분)</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minBet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>최소 베팅 금액 (MOVE)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="w-full" type="submit">
            게임 생성하기
          </Button>
        </form>
      </Form>
    </>
  );
};
