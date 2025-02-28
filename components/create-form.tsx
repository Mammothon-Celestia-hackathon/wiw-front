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
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, 'Please enter a game name'),
  topic: z.string().min(1, 'Please enter a debate topic'),
  agentA: z.object({
    name: z.string().min(1, 'Please enter AI name'),
    character: z.string().min(1, 'Please enter character description'),
    address: z.string().min(1, 'Please enter address')
  }),
  agentB: z.object({
    name: z.string().min(1, 'Please enter AI name'),
    character: z.string().min(1, 'Please enter character description'),
    address: z.string().min(1, 'Please enter address')
  })
});

const CONTRACT_ADDRESS =
  '0xd7ae4e1e8d4486450936d8fdbb93af0cba8e1ae00c00f82653f76c5d65d76a6f';

export const CreateForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [agentATags, setAgentATags] = useState<string[]>([]);
  const [agentBTags, setAgentBTags] = useState<string[]>([]);
  const [agentACharacter, setAgentACharacter] = useState('');
  const [agentBCharacter, setAgentBCharacter] = useState('');
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      topic: '',
      agentA: { name: '', character: '', address: '' },
      agentB: { name: '', character: '', address: '' }
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      if (!window.aptos) {
        toast({ variant: 'destructive', title: 'Please install Aptos Wallet' });
        return;
      }

      const { address } = await window.aptos.connect();

      const transaction = {
        payload: {
          type: 'entry_function_payload',
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
            values.agentB.address
          ]
        }
      };

      const response = await window.aptos.signAndSubmitTransaction(transaction);
      console.log('Transaction Response:', response);
      toast({ title: 'Debate created successfully' });
    } catch (error) {
      console.error('Error details:', error);
      toast({ variant: 'destructive', title: 'Failed to create debate' });
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
                <FormLabel>Game Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter game name"
                    {...field}
                  />
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
                <FormLabel>Debate Topic</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter debate topic"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

          <Button
            disabled={loading}
            className="w-full"
            type="submit"
            onClick={() => router.push('/')}
          >
            Create Debate
          </Button>
        </form>
      </Form>
    </>
  );
};
