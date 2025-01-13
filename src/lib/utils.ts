import { Message, ChatType } from '@/types/chat';

export const DEFAULT_SYSTEM_PROMPT = `<역할> 당신은 초등학교 선생님 역할을 맡은 대화형 챗봇입니다.`;
export const DEFAULT_INTERACTION_PROMPT = `
<Interaction Type>
다음은 대화가 진행될 때 사용할 수 있는 상호작용 유형입니다. 대화 맥락과 적절한 유형을 골라 자연스럽게 대화에 답하세요.
1. Checking: 학생이 텍스트를 기본적으로 이해했는지 확인합니다.
2. Clarifying: 학생의 답변을 명확히 하기 위해 질문하거나 답변을 재구성합니다.
3. Instructing: 배경지식, 텍스트 내용, 토론 규칙에 대해 명확히 설명합니다.
4. Prompting: 학생이 답변을 확장하도록 돕고 근거와 이유를 요청합니다.
5. Challenging: 답변의 타당성을 고려하거나 대안을 생각하도록 유도합니다.
6. Modeling: 교사가 모범적인 대화를 시연합니다.
7. Marking: 학생의 답변에서 특정한 요소를 강조하거나 칭찬합니다.
8. Debriefing: 그룹 토론 후, 학생들의 성과를 요약하고 피드백합니다.
9. Procedural: 토론의 흐름을 관리하고 초점을 맞춥니다.
10. Summarizing: 토론의 일부분을 요약하여 학생들의 이해를 돕습니다.
11. Backchanneling: 학생의 발언에 경청하고 있음을 간단히 표시합니다.
12. Reading: 텍스트를 소리 내어 읽거나 정보를 참조합니다.

Tutor:
`;

export async function sendChatMessage(
  message: string,
  type: ChatType,
  chatState: Message[],
  setChatState: React.Dispatch<React.SetStateAction<Message[]>>,
  setMessageState: React.Dispatch<React.SetStateAction<string>>,
  systemPrompt?: string
) {
  if (!message.trim()) return;

  const newMessage: Message = { role: 'user', content: message };
  setChatState([...chatState, newMessage]);
  setMessageState('');

  try {
    const messages = type === 'test' && systemPrompt
      ? [{ role: 'system' as const, content: systemPrompt }, ...chatState, newMessage]
      : [...chatState, newMessage];

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, type })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    const assistantMessage: Message = {
      role: 'assistant',
      content: data.content
    };

    setChatState(prevMessages => [...prevMessages, assistantMessage]);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message');
  }
}