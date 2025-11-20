import {
  RemoteLLMChatNode,
  RemoteTTSNode,
  SequentialGraphBuilder,
  TextChunkingNode,
} from '@inworld/runtime/graph';

const graphBuilder = new SequentialGraphBuilder({
  id: 'llm-tts-graph',
  nodes: [
    new RemoteLLMChatNode({
      provider: 'openai',
      modelName: 'gpt-4o-mini',
      stream: true,
      messageTemplates: [
        {
          role: 'user',
          content: {
            type: 'template',
            template: '{{user_input}}',
          },
        },
      ],
    }),
    new TextChunkingNode(),
    new RemoteTTSNode({
      speakerId: 'Ashley',
      modelId: 'inworld-tts-1',
      sampleRate: 24000,
    }),
  ],
  enableRemoteConfig: false
});

export const graph = graphBuilder.build();
