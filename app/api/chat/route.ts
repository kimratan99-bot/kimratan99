import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Next.js Edge Runtime 설정 (선택 사항)
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // OpenAI 스트리밍 응답 생성
  const result = await streamText({
    model: openai('gpt-4o'), // 또는 'gpt-4-turbo'
    system: `너는 친절하고 똑똑한 중고등학생용 수학 튜터 '승평 AI'야. 
    학생들이 수학 문제를 물어보면 단계별로 이해하기 쉽게 설명해줘. 
    정답만 알려주기보다 풀이 과정을 유도하는 방식으로 답변해줘. 
    수학 기호는 텍스트로 읽기 편하게 작성해주고, 격려의 말도 잊지 마.`,
    messages,
  });

  return result.toDataStreamResponse();
}
