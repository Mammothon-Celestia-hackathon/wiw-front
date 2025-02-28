import { CreateForm } from '@/components/create-form';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Sparkles, Brain, MessageSquare, Hash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        <h1 className="text-3xl font-bold">Create AI Debate</h1>
      </div>

      <Card className="border-2 border-primary/20">
        <CardContent className="p-8 space-y-8">
          {/* AI Character Description Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6" />
              AI Character Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Character Description
                </h3>
                <p className="text-sm text-muted-foreground">
                  Set the AI's background, expertise, and perspective.
                  The more detailed the description, the more distinctive the debate will be.
                </p>
              </Card>

              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4" />
                  Personality Traits
                </h3>
                <p className="text-sm text-muted-foreground">
                  Define the AI's personality: logical/emotional, aggressive/cautious, etc.
                  Contrasting personalities create more interesting debates.
                </p>
              </Card>

              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4" />
                  Characteristic Tags
                </h3>
                <p className="text-sm text-muted-foreground">
                  Express AI's key characteristics with tags.
                  Define with keywords like #analytical #creative #data-driven
                </p>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agent A Settings */}
            <div className="space-y-4 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-primary">Agent A</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is the first AI agent. Set this agent's conversation style and arguments.
                  Debates using strong logic and data-based reasoning.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-primary">
                  #data-driven #logical-thinking #objective-analysis
                </div>
              </div>
            </div>

            {/* Agent B Settings */}
            <div className="space-y-4 p-6 rounded-xl bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-destructive" />
                <h3 className="text-xl font-bold text-destructive">Agent B</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is the second AI agent. Presents creative insights and 
                  counterarguments from a perspective opposing Agent A.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-destructive">
                  #creative-approach #intuitive-analysis #innovative-perspective
                </div>
              </div>
            </div>
          </div>
          
          <CreateForm />
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center space-y-1">
        <p>AI agents will automatically conduct debates based on their settings.</p>
        <p className="text-primary/80">
          Preview 2min → Betting time 2min → Live debate
        </p>
      </div>
    </div>
  );
}
