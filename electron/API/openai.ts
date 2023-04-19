import axios from 'axios';
import { ChatCompletionOptions, ChatCompletionResponse, CompletionOptions, CompletionResponse, EditOptions, EditResponse, ListModelResponse, RetrieveModelResponse } from './openai-interfaces';

let apiKey: string | null = null

/**
 * OpenAI API
 */
export const OpenAI = {
    
    /**
     * OpenAI: Checks if the API key is set
     * @returns {boolean} true if the API key is set, false otherwise
     */
    isApiKeySet: () => apiKey !== null,

    /**
     * OpenAI: Sets the API key
     * @param {string} key The API key
     */
    setApiKey: (key: string) => {
        apiKey = key;
    },

    /**
     * OpenAI: Unsets the API key
     */
    unsetApiKey: () => {
        apiKey = null;
    },

    /**
     * OpenAI: Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @returns {Promise<ListModelResponse>} The list of models response
     */
    async listModels() {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.get('https://api.openai.com/v1/models', { headers: { 'Authorization': `Bearer ${apiKey}` } })).data as ListModelResponse;
    },

    /**
     * OpenAI: Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @param {string} id The model ID
     * @returns {Promise<RetrieveModelResponse>} The retrieved model response
     * @throws {Error} If the API key is not set
     * @throws {Error} If the model ID is not set
     */
    async retrieveModel(id: string) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        if (!id) {
            throw new Error('Model ID is not set')
        }
        return (await axios.get(`https://api.openai.com/v1/models/${id}`, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data as RetrieveModelResponse;
    },
    
    /**
     * OpenAI: Creates a completion for the provided prompt and parameters.
     * @param {CompletionOptions} options The completion options
     * @returns {Promise<CompletionResponse>} The completion response
     * @throws {Error} If the API key is not set
     * @throws {Error} If the model is not set
     * @throws {Error} If the prompt is not set
     */
    async createCompletion(options: CompletionOptions) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        if (!options.model) {
            throw new Error('Model is not set')
        }
        if (!options.prompt) {
            throw new Error('Prompt is not set')
        }
        return (await axios.post('https://api.openai.com/v1/completions', {
            model: options.model,
            prompt: options.prompt,
            max_tokens: options.max_tokens ?? 16,
            temperature: options.temperature ?? 1,
            top_p: options.top_p ?? 1,
            n: options.n ?? 1,
            frequency_penalty: options.frequency_penalty ?? 0,
            presence_penalty: options.presence_penalty ?? 0,
            best_of: options.best_of ?? 1,
        }, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data as CompletionResponse;
    },

    /**
     * OpenAI: Creates a model response for the given chat conversation.
     * @param {ChatCompletionOptions} options The completion options
     * @returns {Promise<ChatCompletionResponse>} The completion response
     * @throws {Error} If the API key is not set
     * @throws {Error} If the model is not set
     * @throws {Error} If the messages is not set or empty
     */
    async createChatCompletion(options: ChatCompletionOptions) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        if (!options.model) {
            throw new Error('Model is not set')
        }
        if (!options.messages || options.messages.length === 0) {
            throw new Error('Messages is not set or is empty')
        }
        return (await axios.post('https://api.openai.com/v1/chat/completions', {
            model: options.model,
            messages: options.messages,
            max_tokens: options.max_tokens ?? Infinity,
            temperature: options.temperature ?? 1,
            top_p: options.top_p ?? 1,
            n: options.n ?? 1,
            frequency_penalty: options.frequency_penalty ?? 0,
            presence_penalty: options.presence_penalty ?? 0,
        }, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data as ChatCompletionResponse;
    },

    /**
     * OpenAI: Creates a new edit for the provided input, instruction, and parameters.
     * @param {EditOptions} options The edit options
     * @returns {Promise<EditResponse>} The edit response
     * @throws {Error} If the API key is not set
     * @throws {Error} If the model is not set
     * @throws {Error} If the instruction is not set
     */
    async createEdit(options: EditOptions) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        if (!options.model) {
            throw new Error('Model is not set')
        }
        if (!options.instruction) {
            throw new Error('Instruction is not set')
        }
        return (await axios.post('https://api.openai.com/v1/edits', {
            model: options.model,
            input: options.input ?? '',
            instruction: options.instruction,
            temperature: options.temperature ?? 1,
            top_p: options.top_p ?? 1,
            n: options.n ?? 1,
        }, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data as EditResponse;
    },

    // TODO: Implement
    async listFiles() {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.get('https://api.openai.com/v1/files', { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async uploadFile(file: File) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        const formData = new FormData();
        formData.append('file', file);
        return (await axios.post('https://api.openai.com/v1/files', formData, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async deleteFile(id: string) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.delete(`https://api.openai.com/v1/files/${id}`, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async retrieveFile(id: string) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.get(`https://api.openai.com/v1/files/${id}`, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async retrieveFileContent(id: string) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.get(`https://api.openai.com/v1/files/${id}/content`, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async createFineTune(options: any) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        if (!options.model) {
            throw new Error('Model is not set')
        }
        if (!options.dataset) {
            throw new Error('Dataset is not set')
        }
        if (!options.config) {
            throw new Error('Config is not set')
        }
        return (await axios.post('https://api.openai.com/v1/fine-tunes', {
            model: options.model,
            dataset: options.dataset,
            config: options.config,
        }, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async listFineTunes() {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.get('https://api.openai.com/v1/fine-tunes', { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async retrieveFineTune(id: string) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.get(`https://api.openai.com/v1/fine-tunes/${id}`, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async cancelFineTune(id: string) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.post(`https://api.openai.com/v1/fine-tunes/${id}/cancel`, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async listFineTuneEvents(id: string) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.get(`https://api.openai.com/v1/fine-tunes/${id}/events`, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    },

    // TODO: Implement
    async deleteFineTune(id: string) {
        if (!apiKey) {
            throw new Error('API key is not set')
        }
        return (await axios.delete(`https://api.openai.com/v1/fine-tunes/${id}`, { headers: { 'Authorization': `Bearer ${apiKey}` } })).data;
    }

}
