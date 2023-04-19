/**
 * OpenAI: Model permission interface
 */
export interface ModelPermission {
    allow_create_engine: boolean,
    allow_fine_tuning: boolean,
    allow_logprobs: boolean,
    allow_sampling: boolean,
    allow_search_indices: boolean,
    allow_view: boolean,
    created: number,
    group: string | null,
    id: string,
    is_blocking: boolean,
    object: string,
    organization: string,
}

/**
 * OpenAI: List model response interface
 */
export interface ListModelResponse {
    data: {
        id: string,
        object: string,
        owned_by: string,
        permission: ModelPermission[]
    }[],
    object: string
}

/**
 * OpenAI: Retrieve model response interface
 */
export interface RetrieveModelResponse {
    data: {
        id: string,
        object: string,
        owned_by: string,
        permission: ModelPermission[]
    },
    object: string
}

/**
 * OpenAI: Completion response interface
 */
export interface CompletionResponse {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: {
        finish_reason: string,
        index: number,
        logprobs: {
            token_logprobs: number[],
            top_logprobs: number[]
        },
        object: string,
        text: string
    }[],
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    }
}

/**
 * OpenAI: Completion options interface
 */
export interface CompletionOptions {
    model: string,
    prompt: string,
    suffix?: string,
    max_tokens?: number,
    temperature?: number,
    top_p?: number,
    n?: number,
    logprobs?: number,
    echo?: boolean,
    stop?: string[]
    presence_penalty?: number,
    frequency_penalty?: number,
    best_of?: number,
    logit_bias?: {
        [key: string]: number
    },
    user?: string,
}

/**
 * OpenAI: Chat completion options interface
 */
export interface ChatCompletionOptions {
    model: string,
    messages: ChatCompletionMessage[],
    suffix?: string,
    temperature?: number,
    top_p?: number,
    n?: number,
    stop?: string[],
    max_tokens?: number,
    presence_penalty?: number,
    frequency_penalty?: number,
    logit_bias?: {
        [key: string]: number
    },
    user?: string,
}

/**
 * OpenAI: Chat completion response interface
 */
export interface ChatCompletionResponse {
    id: string,
    object: string,
    created: number,
    choices: {
        index: number,
        message: ChatCompletionMessage,
        finish_reason: string,
    }[],
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    }
}

/**
 * OpenAI: Chat completion message interface
 */
export interface ChatCompletionMessage {
    role: 'system' | 'user' | 'assistant',
    content: string,
    name?: string,
}

/**
 * OpenAI: Edit response interface
 */
export interface EditOptions {
    model: string,
    input?: string,
    instruction: string,
    n?: number,
    temperature?: number,
    top_p?: number,
}

/**
 * OpenAI: Edit response interface
 */
export interface EditResponse {
    object: string,
    created: number,
    choices: {
        index: number,
        text: string,
    }[],
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    }
}


