# LLM + TTS Pipeline Graph

This is an Inworld Runtime graph that creates a complete conversational AI pipeline with LLM chat and text-to-speech capabilities.

## Overview

This template provides a production-ready pipeline that:

- Accepts user input and formats it for LLM processing
- Sends requests to an LLM provider (OpenAI GPT-4o-mini by default)
- Streams responses for better user experience
- Chunks text for optimal TTS processing
- Converts text responses to speech using TTS

## Getting Started

### Installation

```bash
npm install
```

### Configuration

Before running, you'll need to set up your API keys:

```bash
# Set your Inworld API key
export INWORLD_API_KEY="your-inworld-api-key"
```

### Running the Graph

#### As a server (recommended):

```bash
npm start
# or
npx inworld serve {{graphFileName}}
```

#### Direct execution:

```bash
npm run run
# or
npx inworld run {{graphFileName}}
```

## Project Structure

- **`{{graphFileName}}`** - Main graph file with the LLM-TTS pipeline
- **`package.json`** - Project dependencies and scripts
- **`README.md`** - This file

## Pipeline Architecture

The graph uses a `SequentialGraphBuilder` with the following nodes in order:

1. **LLMChatRequestBuilderNode**: Formats user input into LLM chat messages
2. **RemoteLLMChatNode**: Sends requests to the LLM provider and receives responses
3. **TextChunkingNode**: Breaks text into optimal chunks for TTS processing
4. **RemoteTTSNode**: Converts text chunks to speech

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

## Environment Variables

The following environment variables can be configured:

- `INWORLD_API_KEY`: API key for OpenAI (required for GPT models)

## Deployment

To package your graph for deployment:

```bash
npm run deploy
# or
npx inworld deploy {{graphFileName}}
```

This will create a deployment package that can be uploaded to Inworld Cloud.

## Documentation

For more information about:

- Inworld Runtime: Visit the [documentation](https://docs.inworld.ai/)
- LLM providers: Check provider-specific documentation
- TTS options: See the TTS provider documentation

## Requirements

- Node.js >= 18.0.0
- @inworld/cli package
- Valid Inworld API key
