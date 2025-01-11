// app/api/chat/route.ts
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
const HELPER_SYSTEM_PROMPT = "You are a helpful assistant specialized in helping users write better system prompts for AI models. Provide specific suggestions and improvements while keeping responses concise and practical.";

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