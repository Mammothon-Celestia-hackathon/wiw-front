'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface AgentFormFieldsProps {
  form: UseFormReturn<any>;
  type: 'A' | 'B';
  tags: string[];
  onAddTag: (type: 'A' | 'B', value: string) => void;
  onRemoveTag: (type: 'A' | 'B', index: number) => void;
  onCharacterChange: (value: string) => void;
}

export function AgentFormFields({
  form,
  type,
  tags,
  onAddTag,
  onRemoveTag,
  onCharacterChange
}: AgentFormFieldsProps) {
  const colorClass = type === 'A' ? 'text-primary' : 'text-destructive';

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${colorClass}`}>
        Agent {type} 설정
      </h3>

      <FormField
        control={form.control}
        name={`agent${type}.character`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>캐릭터 설명</FormLabel>
            <FormControl>
              <Textarea
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

      <FormField
        control={form.control}
        name={`agent${type}.tag`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>특성 태그</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input {...field} placeholder="태그 입력" className="flex-1" />
              </FormControl>
              <Button
                type="button"
                onClick={() => onAddTag(type, field.value)}
                size="sm"
                className="shrink-0 px-8"
              >
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className={colorClass}>
                  {tag}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => onRemoveTag(type, index)}
                  />
                </Badge>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
} 