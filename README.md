# LLM + TTS Pipeline

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Powered by Inworld AI](https://img.shields.io/badge/Powered_by-Inworld_AI-orange)](https://inworld.ai/runtime)
[![Documentation](https://img.shields.io/badge/Documentation-Read_Docs-blue)](https://docs.inworld.ai/docs/node/overview)
[![Model Providers](https://img.shields.io/badge/Model_Providers-See_Models-purple)](https://docs.inworld.ai/docs/models#llm)

Production-ready LLM → TTS endpoint to integrate into your app.

## Prerequisites
- Node.js (v20 or higher)

## Get Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/inworld-ai/llm-to-tts-node
cd llm-to-tts-node
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Authenticate

Log in to your Inworld account:

```bash
inworld login
```

### Step 4: Run the Application

**Test locally with instant feedback:**

```bash
inworld run ./graph.ts '{"input": {"user_input": "Hello, how are you?"}}'
```

**Serve as an HTTP server with Swagger UI:**

```bash
inworld serve ./graph.ts --swagger
```

**Serve on custom port:**

```bash
inworld serve ./graph.ts --port 8080
```

### Step 5: Deploy to Inworld Cloud

Deploy your graph to Inworld Cloud to create a persistent, production-ready endpoint:

```bash
inworld deploy ./graph.ts
```

## Repo Structure

```
llm-to-tts-node/
├── graph.ts              # Main graph file with the LLM-TTS pipeline
├── metadata.json         # Graph metadata
├── package.json          # Project dependencies and scripts
├── README.md             # Documentation
└── LICENSE               # MIT License
```

## Architecture

The graph uses a `SequentialGraphBuilder` with the following nodes in order:

1. **LLMChatRequestBuilderNode** - Formats user input into LLM chat messages
2. **RemoteLLMChatNode** - Sends requests to the LLM provider and receives responses
3. **TextChunkingNode** - Breaks text into optimal chunks for TTS processing
4. **RemoteTTSNode** - Converts text chunks to speech

## Customization

### Changing the LLM Provider

Edit the `RemoteLLMChatNode` configuration in `{{graphFileName}}`:

```typescript
new RemoteLLMChatNode({
  provider: 'anthropic', // Change to 'anthropic', 'google', etc.
  modelName: 'claude-3-sonnet', // Change to desired model
  stream: true,
  // Add other provider-specific options
});
```

### Modifying the System Prompt

Add system messages to the `LLMChatRequestBuilderNode`:

```typescript
new LLMChatRequestBuilderNode({
  messages: [
    {
      role: 'system',
      content: { type: 'text', text: 'You are a helpful assistant...' },
    },
    {
      role: 'user',
      content: { type: 'template', template: '{{user_input}}' },
    },
  ],
});
```

### Customizing TTS Settings

Configure the TTS node for different voices or providers:

```typescript
new RemoteTTSNode({
  speakerId: 'Dennis',
  modelId: 'inworld-tts-1-max',
});
```

### Adding Additional Processing

You can insert additional nodes into the pipeline:

```typescript
const graphBuilder = new SequentialGraphBuilder({
  id: 'custom-text-node-llm',
  nodes: [
    new LLMChatRequestBuilderNode({...}),
    new RemoteLLMChatNode({...}),
    new CustomProcessingNode(),  // Your custom node
    new TextChunkingNode(),
    new RemoteTTSNode(),
  ],
});
```

## Deployment

To package your graph for deployment:

```bash
npm run deploy
# or
npx inworld deploy {{graphFileName}}
```

This will create a deployment package that can be uploaded to Inworld Cloud.

## Troubleshooting

For more information about:

- Inworld Runtime: Visit the [documentation](https://docs.inworld.ai/)
- LLM providers: Check provider-specific documentation
- TTS options: See the TTS provider documentation

**Bug Reports**: [GitHub Issues](https://github.com/inworld-ai/llm-to-tts-node/issues)

**General Questions**: For general inquiries and support, please email us at support@inworld.ai

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
