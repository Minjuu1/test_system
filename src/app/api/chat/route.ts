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
const HELPER_SYSTEM_PROMPT = "너는 프롬프트 엔지니어링을 마스터한 프롬프트 엔지니어야. 현재 교육용 챗봇을 만들고자 하는 초보 선생님을 도와 생성형 AI를 효과적으로 컨트롤 할 수 있는 프롬프트를 만들어줘야해. 선생님이 긴 요구사항을 남기면, 그 요구사항에 맞는 프롬프트를 간결하게 한국어로 작성해줘.";

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