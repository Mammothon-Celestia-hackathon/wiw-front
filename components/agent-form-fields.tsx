'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { Users } from 'lucide-react';
import { Label } from '@/components/ui/label';

export interface AgentFormFieldsProps {
  form: UseFormReturn<any>;
  type: 'A' | 'B';
  tags: string[];
  onAddTag: (type: 'A' | 'B', value: string) => void;
  onRemoveTag: (type: 'A' | 'B', index: number) => void;
  onCharacterChange: (value: string) => void;
  requireAddress?: boolean;
}

export const AgentFormFields = ({
  form,
  type,
  tags,
  onAddTag,
  onRemoveTag,
  onCharacterChange,
  requireAddress = false
}: AgentFormFieldsProps) => {
  const [tagInput, setTagInput] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <h3 className="font-semibold">AI Agent {type}</h3>
      </div>

      <FormField
        control={form.control}
        name={`agent${type}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter agent name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`agent${type}.character`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Character Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the agent's character and role"
                className="resize-none"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onCharacterChange(e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {requireAddress && (
        <FormField
          control={form.control}
          name={`agent${type}.address`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter wallet address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onRemoveTag(type, index)}
            >
              {tag}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add tag (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onAddTag(type, tagInput);
                setTagInput('');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}; 