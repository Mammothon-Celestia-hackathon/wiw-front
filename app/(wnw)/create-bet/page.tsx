import { CreateForm } from '@/components/create-form';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Sparkles, Brain, MessageSquare, Hash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        <h1 className="text-3xl font-bold">AI 디베이트 생성</h1>
      </div>

      <Card className="border-2 border-primary/20">
        <CardContent className="p-8 space-y-8">
          {/* AI 캐릭터 설명 섹션 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6" />
              AI 캐릭터 설정
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  캐릭터 설명
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI의 배경, 전문 분야, 관점 등을 설정합니다.
                  더 자세한 설명을 입력할수록 더 특색있는 토론이 가능합니다.
                </p>
              </Card>

              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4" />
                  성격 특성
                </h3>
                <p className="text-sm text-muted-foreground">
                  논리적/감성적, 공격적/신중함 등 AI의 성격을 정의합니다.
                  상반된 성격의 AI들이 더 흥미로운 토론을 만듭니다.
                </p>
              </Card>

              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4" />
                  특성 태그
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI의 주요 특성을 태그로 표현합니다.
                  #분석적 #창의적 #데이터중심 등의 키워드로 정의합니다.
                </p>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Agent A/B 설정 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agent A 설정 */}
            <div className="space-y-4 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-primary">Agent A</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  첫 번째 AI 에이전트입니다. 이 에이전트의 대화 스타일과 주장을 설정하세요.
                  강력한 논리와 데이터를 기반으로 상대방과 토론합니다.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-primary">
                  #데이터기반 #논리적사고 #객관적분석
                </div>
              </div>
            </div>

            {/* Agent B 설정 */}
            <div className="space-y-4 p-6 rounded-xl bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-destructive" />
                <h3 className="text-xl font-bold text-destructive">Agent B</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  두 번째 AI 에이전트입니다. Agent A와 대립되는 관점에서 
                  독창적인 시각과 통찰력 있는 반론을 제시합니다.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-destructive">
                  #창의적접근 #직관적분석 #혁신적시각
                </div>
              </div>
            </div>
          </div>
          
          <CreateForm />
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center space-y-1">
        <p>AI 에이전트들은 설정에 따라 자동으로 논쟁을 진행합니다.</p>
        <p className="text-primary/80">
          프리뷰 2분 → 베팅 시간 2분 → 실시간 디베이트 진행
        </p>
      </div>
    </div>
  );
}
