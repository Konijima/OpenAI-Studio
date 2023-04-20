import axios from 'axios';
import {
  OpenAICancelFineTuneResponse,
  OpenAIChatCompletionOptions,
  OpenAIChatCompletionResponse,
  OpenAICompletionOptions,
  OpenAICompletionResponse,
  OpenAICreateFineTuneResponse,
  OpenAICreateModerationResponse,
  OpenAIDeleteFileResponse,
  OpenAIDeleteFineTuneResponse,
  OpenAIEditOptions,
  OpenAIEditResponse,
  OpenAIFineTuningOptions,
  OpenAIListEnginesResponse,
  OpenAIListFilesResponse,
  OpenAIListFineTuneEventsResponse,
  OpenAIListFineTunesResponse,
  OpenAIListModelResponse,
  OpenAIModerationOptions,
  OpenAIRetrieveEngineResponse,
  OpenAIRetrieveFileResponse,
  OpenAIRetrieveFineTuneResponse,
  OpenAIRetrieveModelResponse,
  OpenAIUploadFileResponse,
} from './openai-interfaces';

/**
 * The api key is not exposed to the renderer
 * @todo Load and save the API key securely
 */
let apiKey: string | null = null;

/**
 * The OpenAI API endpoint
 */
const openAIEndpoint = 'https://api.openai.com/v1';

/**
 * Returns the headers for the OpenAI API
 * @returns {object} The headers
 */
function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
}

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
   * @returns {Promise<OpenAIListModelResponse>} The list of models response
   */
  async listModels() {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/models`, { headers: getHeaders() })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIListModelResponse;
  },

  /**
   * OpenAI: Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
   * @param {string} model_id The model ID
   * @returns {Promise<OpenAIRetrieveModelResponse>} The retrieved model response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the model ID is not set
   */
  async retrieveModel(model_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!model_id) {
      throw new Error('Model ID is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/models/${model_id}`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIRetrieveModelResponse;
  },

  /**
   * OpenAI: Creates a completion for the provided prompt and parameters.
   * @param {OpenAICompletionOptions} options The completion options
   * @returns {Promise<OpenAICompletionResponse>} The completion response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the model is not set
   * @throws {Error} If the prompt is not set
   */
  async createCompletion(options: OpenAICompletionOptions) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!options.model) {
      throw new Error('Model is not set');
    }
    if (!options.prompt) {
      throw new Error('Prompt is not set');
    }

    const data = {
      model: options.model,
      prompt: options.prompt,
      suffix: options.suffix ?? undefined,
      max_tokens: options.max_tokens ?? 16,
      temperature: options.temperature ?? 1,
      top_p: options.top_p ?? 1,
      n: options.n ?? 1,
      logprobs: options.logprobs ?? undefined,
      echo: options.echo ?? false,
      stop: options.stop ?? undefined,
      presence_penalty: options.presence_penalty ?? 0,
      frequency_penalty: options.frequency_penalty ?? 0,
      best_of: options.best_of ?? 1,
      logit_bias: options.logit_bias ?? undefined,
      user: options.user ?? undefined,
    };

    return (
      await axios
        .post(`${openAIEndpoint}/completions`, data, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAICompletionResponse;
  },

  /**
   * OpenAI: Creates a model response for the given chat conversation.
   * @param {OpenAIChatCompletionOptions} options The completion options
   * @returns {Promise<OpenAIChatCompletionResponse>} The completion response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the model is not set
   * @throws {Error} If the messages is not set or empty
   */
  async createChatCompletion(options: OpenAIChatCompletionOptions) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!options.model) {
      throw new Error('Model is not set');
    }
    if (!options.messages || options.messages.length === 0) {
      throw new Error('Messages is not set or is empty');
    }

    const data = {
      model: options.model,
      messages: options.messages,
      temperature: options.temperature ?? 1,
      top_p: options.top_p ?? 1,
      n: options.n ?? 1,
      stop: options.stop ?? undefined,
      max_tokens: options.max_tokens ?? Infinity,
      presence_penalty: options.presence_penalty ?? 0,
      frequency_penalty: options.frequency_penalty ?? 0,
      logit_bias: options.logit_bias ?? undefined,
      user: options.user ?? undefined,
    };

    return (
      await axios
        .post(`${openAIEndpoint}/chat/completions`, data, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIChatCompletionResponse;
  },

  /**
   * OpenAI: Creates a new edit for the provided input, instruction, and parameters.
   * @param {OpenAIEditOptions} options The edit options
   * @returns {Promise<OpenAIEditResponse>} The edit response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the model is not set
   * @throws {Error} If the instruction is not set
   */
  async createEdit(options: OpenAIEditOptions) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!options.model) {
      throw new Error('Model is not set');
    }
    if (!options.instruction) {
      throw new Error('Instruction is not set');
    }

    const data = {
      model: options.model,
      input: options.input ?? '',
      instruction: options.instruction,
      n: options.n ?? 1,
      temperature: options.temperature ?? 1,
      top_p: options.top_p ?? 1,
    };

    return (
      await axios
        .post(`${openAIEndpoint}/edits`, data, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIEditResponse;
  },

  /**
   * OpenAI: Returns a list of files that belong to the user's organization.
   * @returns {Promise<OpenAIListFilesResponse>} The list of files response
   * @throws {Error} If the API key is not set
   */
  async listFiles() {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/files`, { headers: getHeaders() })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIListFilesResponse;
  },

  /**
   * OpenAI: Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
   * @param {File} file The file to upload
   * @param {string} purpose The intended purpose of the uploaded documents. Use "fine-tune" for Fine-tuning. This allows us to validate the format of the uploaded file.
   * @returns {Promise<OpenAIUploadFileResponse>} The upload file response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the file is not set
   * @throws {Error} If the purpose is not set
   */
  async uploadFile(file: File, purpose: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!file) {
      throw new Error('File is not set');
    }
    if (!purpose) {
      throw new Error('Purpose is not set');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', purpose);
    return (
      await axios
        .post(`${openAIEndpoint}/files`, formData, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIUploadFileResponse;
  },

  /**
   * OpenAI: Delete a file.
   * @param file_id The ID of the file to use for this request
   * @returns {Promise<OpenAIDeleteFileResponse>} The delete file response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the ID is not set
   */
  async deleteFile(file_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!file_id) {
      throw new Error('File ID is not set');
    }
    return (
      await axios
        .delete(`${openAIEndpoint}/files/${file_id}`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIDeleteFileResponse;
  },

  /**
   * Returns information about a specific file.
   * @param file_id The ID of the file to use for this request
   * @returns {Promise<OpenAIRetrieveFileResponse>} The retrieve file response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the ID is not set
   */
  async retrieveFile(file_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!file_id) {
      throw new Error('File ID is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/files/${file_id}`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIRetrieveFileResponse;
  },

  /**
   * Returns the contents of the specified file
   * @param file_id The ID of the file to use for this request
   * @returns {Promise<string>} The file content
   * @throws {Error} If the API key is not set
   * @throws {Error} If the ID is not set
   */
  async retrieveFileContent(file_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!file_id) {
      throw new Error('File ID is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/files/${file_id}/content`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as string;
  },

  /**
   * OpenAI: Creates a job that fine-tunes a specified model from a given dataset. Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.
   * @param {OpenAIFineTuningOptions} options The fine-tuning options
   * @returns {Promise<FineTuningResponse>} The fine-tuning response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the training file is not set
   */
  async createFineTune(options: OpenAIFineTuningOptions) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!options.training_file) {
      throw new Error('Training file is not set');
    }

    const data = {
      training_file: options.training_file,
      model: options.model ?? 'curie',
      n_epochs: options.n_epochs ?? 4,
      batch_size: options.batch_size ?? undefined,
      learning_rate_multiplier: options.learning_rate_multiplier ?? undefined,
      prompt_loss_weight: options.prompt_loss_weight ?? 0.01,
      compute_classification_metrics:
        options.compute_classification_metrics ?? false,
      classification_n_classes: options.classification_n_classes ?? undefined,
      classification_positive_class:
        options.classification_positive_class ?? undefined,
      classification_betas: options.classification_betas ?? undefined,
      suffix: options.suffix ?? undefined,
    };

    return (
      await axios
        .post(`${openAIEndpoint}/fine-tunes`, data, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAICreateFineTuneResponse;
  },

  /**
   * OpenAI: List your organization's fine-tuning jobs
   * @returns {Promise<OpenAIListFineTunesResponse>} The list fine-tunes response
   * @throws {Error} If the API key is not set
   */
  async listFineTunes() {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/fine-tunes`, { headers: getHeaders() })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIListFineTunesResponse;
  },

  /**
   * OpenAI: Gets info about the fine-tune job.
   * @param finetune_id The ID of the fine-tune job
   * @returns {Promise<OpenAIRetrieveFineTuneResponse>} The retrieve fine-tune response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the ID is not set
   */
  async retrieveFineTune(finetune_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!finetune_id) {
      throw new Error('Fine-tune ID is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/fine-tunes/${finetune_id}`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIRetrieveFineTuneResponse;
  },

  /**
   * OpenAI: Immediately cancel a fine-tune job.
   * @param finetune_id The ID of the fine-tune job
   * @returns {Promise<OpenAICancelFineTuneResponse>} The cancel fine-tune response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the ID is not set
   */
  async cancelFineTune(finetune_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!finetune_id) {
      throw new Error('Fine-tune ID is not set');
    }
    return (
      await axios
        .post(`${openAIEndpoint}/fine-tunes/${finetune_id}/cancel`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAICancelFineTuneResponse;
  },

  /**
   * OpenAI: Get fine-grained status updates for a fine-tune job.
   * @param finetune_id The ID of the fine-tune job
   * @returns {Promise<OpenAIListFineTuneEventsResponse>} The fine-tune events response
   * @throws {Error} If the API key is not set
   */
  async listFineTuneEvents(finetune_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!finetune_id) {
      throw new Error('Fine-tune ID is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/fine-tunes/${finetune_id}/events`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIListFineTuneEventsResponse;
  },

  /**
   * OpenAI: Delete a fine-tuned model. You must have the Owner role in your organization.
   * @param finetune_id The ID of the fine-tune to delete
   * @returns {Promise<OpenAIDeleteFineTuneResponse>} The delete fine-tune response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the ID is not set
   */
  async deleteFineTune(finetune_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!finetune_id) {
      throw new Error('Fine-tune ID is not set');
    }
    return (
      await axios
        .delete(`${openAIEndpoint}/fine-tunes/${finetune_id}`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIDeleteFineTuneResponse;
  },

  /**
   * OpenAI: Classifies if text violates OpenAI's Content Policy
   * @param options The moderation options
   * @returns {Promise<OpenAICreateModerationResponse>} The create moderation response
   * @throws {Error} If the API key is not set
   * @throws {Error} If the input is not set
   */
  async createModeration(options: OpenAIModerationOptions) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!options.input) {
      throw new Error('Input is not set');
    }

    const data = {
      input: options.input,
      model: options.model ?? 'text-moderation-latest',
    };

    return (
      await axios
        .post(`${openAIEndpoint}/moderations`, data, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAICreateModerationResponse;
  },

  /**
   * OpenAI: Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
   * @deprecated
   */
  async listEngines() {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/engines`, { headers: getHeaders() })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIListEnginesResponse;
  },

  /**
   * OpenAI: Gets info about the engine.
   * @deprecated
   * @param engine_id The ID of the engine
   * @returns {Promise<OpenAIRetrieveEngineResponse>} The retrieve engine response
   */
  async retrieveEngine(engine_id: string) {
    if (!apiKey) {
      throw new Error('API key is not set');
    }
    if (!engine_id) {
      throw new Error('Engine ID is not set');
    }
    return (
      await axios
        .get(`${openAIEndpoint}/engines/${engine_id}`, {
          headers: getHeaders(),
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.error?.message ?? err.message);
        })
    ).data as OpenAIRetrieveEngineResponse;
  },
};
