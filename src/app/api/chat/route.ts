import { NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';

// 타입 정의
type MessageRole = 'system' | 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
}

interface ChatRequest {
  messages: Message[];
  type: 'helper' | 'test';
}

// ChatOpenAI 인스턴스 초기화
const chatModel = new ChatOpenAI({
  modelName: 'gpt-4',
  temperature: 0.7,
});

// helper 시스템 프롬프트
const HELPER_SYSTEM_PROMPT = "당신은 프롬프트 작성 도우미 역할을 하는 프롬프트 엔지니어링 전문가입니다. 사용자가 대화형으로 요청한 내용을 바탕으로, GPT가 이해하고 실행할 수 있는 명확하고 구체적인 지침을 작성하는 것이 목표입니다. - 사용자의 의도와 내용을 파악하여 1-2줄의 행동 지침을 제안하세요. - 작성한 초안을 제공할 때는, 사용자의 피드백을 요청하고, 이를 반영해 수정하거나 개선합니다. - 필요하다면 예시나 참고할 수 있는 다양한 옵션을 제시합니다.- 사용자가 기술적 제약이나 창의적 요청에 대해 명시하지 않은 경우, 일반적으로 효과적인 기본값을 제안합니다. 대화 스타일은 친절하고 전문적이며, 간결하게 정보를 전달하도록 유지합니다. 항상 사용자의 요청을 중심으로 작업하며, 이해하기 쉬운 표현을 사용하세요.";

export async function POST(req: Request) {
  try {
    const { messages, type }: ChatRequest = await req.json();

    // LangChain 메시지 형식으로 변환
    let langChainMessages = messages.map((msg) => {
      switch (msg.role) {
        case 'user':
          return new HumanMessage(msg.content);
        case 'assistant':
          return new AIMessage(msg.content);
        case 'system':
          return new SystemMessage(msg.content);
        default:
          throw new Error(`Invalid message role: ${msg.role}`);
      }
    });

    // helper 타입인 경우 시스템 프롬프트 추가
    if (type === 'helper') {
      langChainMessages = [
        new SystemMessage(HELPER_SYSTEM_PROMPT),
        ...langChainMessages
      ];
    }

    // 모델 호출
    const response = await chatModel.call(langChainMessages);

    return NextResponse.json({
      content: response.content
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}