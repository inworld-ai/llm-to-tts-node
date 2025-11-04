import {
  LLMChatRequestBuilderNode,
  RemoteLLMChatNode,
  RemoteTTSNode,
  SequentialGraphBuilder,
  TextChunkingNode,
} from '@inworld/runtime/graph';

const graphBuilder = new SequentialGraphBuilder({
  id: 'llm-tts-graph',
  nodes: [
    new LLMChatRequestBuilderNode({
      messages: [
        {
          role: 'user',
          content: { type: 'template', template: '{{user_input}}' },
        },
      ],
    }),
    new RemoteLLMChatNode({
      provider: 'openai',
      modelName: 'gpt-4o-mini',
      stream: true,
    }),
    new TextChunkingNode(),
    new RemoteTTSNode(),
  ],
  enableRemoteConfig: false
});

export const graph = graphBuilder.build();
