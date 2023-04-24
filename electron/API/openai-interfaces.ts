/**
 * OpenAI: OpenAI model interface
 */
export interface OpenAIModel {
  id: string;
  object: 'model';
  owned_by: string;
  parent: string | null;
  permission: OpenAIModelPermission[];
  root: string;
}

/**
 * OpenAI: Model permission interface
 */
export interface OpenAIModelPermission {
  allow_create_engine: boolean;
  allow_fine_tuning: boolean;
  allow_logprobs: boolean;
  allow_sampling: boolean;
  allow_search_indices: boolean;
  allow_view: boolean;
  created_at: number;
  group: string | null;
  id: string;
  is_blocking: boolean;
  object: 'model_permission';
  organization: string;
}

/**
 * OpenAI: Token usage interface
 */
export interface OpenAITokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

/**
 * OpenAI: Fine tune event interface
 */
export interface OpenAIFineTuneEvent {
  object: 'fine-tune-event';
  created_at: number;
  level: 'info' | 'warning' | 'error';
  message: string;
}

/**
 * OpenAI: Hyper parameters interface
 */
export interface OpenAIHyperParameters {
  batch_size: number;
  learning_rate_multiplier: number;
  n_epochs: number;
  prompt_loss_weight: number;
}

/**
 * OpenAI: Base file interface
 */
export interface OpenAIBaseFile {
  id: string;
  object: 'file';
  bytes: number;
  status: 'uploaded' | 'failed' | 'processing' | 'processed';
  created_at: number;
  filename: string;
  purpose: string;
}

/**
 * OpenAI: Result file interface
 */
export interface OpenAIResultFile extends OpenAIBaseFile {
  purpose: 'fine-tune-results';
}

/**
 * OpenAI: Validation file interface
 */
export interface OpenAIValidationFile extends OpenAIBaseFile {
  purpose: 'fine-tune-validation';
}

/**
 * OpenAI: Training file interface
 */
export interface OpenAITrainingFile extends OpenAIBaseFile {
  purpose: 'fine-tune-train';
}

/**
 * OpenAI: Fine-tune interface
 */
export interface OpenAIFineTune {
  id: string;
  object: 'fine-tune';
  created_at: number;
  model: string;
  events: OpenAIFineTuneEvent[];
  fine_tuning_model: string;
  hyperparams: OpenAIHyperParameters;
  organization_id: string;
  result_files: OpenAIResultFile[];
  status:
    | 'queued'
    | 'training'
    | 'failed'
    | 'succeeded'
    | 'canceled'
    | 'timed_out';
  validation_files: OpenAIValidationFile[];
  training_files: OpenAITrainingFile[];
  updated_at: number;
}

/**
 * OpenAI: List model response interface
 */
export interface OpenAIListModelResponse {
  data: OpenAIModel[];
  object: 'list';
}

/**
 * OpenAI: Retrieve model response interface
 */
export interface OpenAIRetrieveModelResponse extends OpenAIModel {}

/**
 * OpenAI: Completion response interface
 */
export interface OpenAICompletionResponse {
  id: string;
  object: 'text_completion';
  created_at: number;
  model: string;
  choices: {
    finish_reason: string;
    index: number;
    logprobs?: {
      token_logprobs: number[];
      top_logprobs: number[];
    };
    text: string;
  }[];
  usage: OpenAITokenUsage;
}

/**
 * OpenAI: Completion options interface
 */
export interface OpenAICompletionOptions {
  /**
   * ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them.
   * @see https://platform.openai.com/docs/models/overview
   */
  model: string;
  /**
   * The prompt(s) to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays.
   */
  prompt: string;
  /**
   * The suffix that comes after a completion of inserted text.
   */
  suffix?: string;
  /**
   * The maximum number of tokens to generate in the completion.
   *
   * The token count of your prompt plus max_tokens cannot exceed the model's context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
   */
  max_tokens?: number;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   *
   * We generally recommend altering this or top_p but not both.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number;
  /**
   * How many completions to generate for each prompt.
   *
   * Note: Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for max_tokens and stop
   */
  n?: number;
  /**
   * Include the log probabilities on the logprobs most likely tokens, as well the chosen tokens. For example, if logprobs is 5, the API will return a list of the 5 most likely tokens. The API will always return the logprob of the sampled token, so there may be up to logprobs+1 elements in the response.
   *
   * The maximum value for logprobs is 5. If you need more than this, please contact us through our Help center and describe your use case.
   */
  logprobs?: number;
  /**
   * Echo back the prompt in addition to the completion
   */
  echo?: boolean;
  /**
   * Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
   */
  stop?: string[];
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
   */
  presence_penalty?: number;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
   */
  frequency_penalty?: number;
  /**
   * Generates best_of completions server-side and returns the "best" (the one with the highest log probability per token). Results cannot be streamed.
   *
   * When used with n, best_of controls the number of candidate completions and n specifies how many to return – best_of must be greater than n.
   *
   * Note: Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for max_tokens and stop.
   */
  best_of?: number;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   *
   * Accepts a json object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this tokenizer tool (which works for both GPT-2 and GPT-3) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.
   *
   * As an example, you can pass {"50256": -100} to prevent the <|endoftext|> token from being generated.
   */
  logit_bias?: {
    [key: string]: number;
  };
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
   */
  user?: string;
}

/**
 * OpenAI: Chat completion options interface
 */
export interface OpenAIChatCompletionOptions {
  /**
   * ID of the model to use. See the model endpoint compatibility table for details on which models work with the Chat API.
   */
  model: string;
  /**
   * A list of messages describing the conversation so far.
   */
  messages: OpenAIChatCompletionMessage[];
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   *
   * We generally recommend altering this or top_p but not both.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number;
  /**
   * How many chat completion choices to generate for each input message.
   */
  n?: number;
  /**
   * Up to 4 sequences where the API will stop generating further tokens.
   */
  stop?: string[];
  /**
   * The maximum number of tokens to generate in the chat completion.
   *
   * The total length of input tokens and generated tokens is limited by the model's context length.
   */
  max_tokens?: number;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
   */
  presence_penalty?: number;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
   */
  frequency_penalty?: number;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   *
   * Accepts a json object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.
   */
  logit_bias?: {
    [key: string]: number;
  };
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
   */
  user?: string;
}

/**
 * OpenAI: Chat completion response interface
 */
export interface OpenAIChatCompletionResponse {
  id: string;
  object: 'chat.completion';
  created_at: number;
  choices: {
    index: number;
    message: OpenAIChatCompletionMessage;
    finish_reason: string;
  }[];
  usage: OpenAITokenUsage;
}

/**
 * OpenAI: Chat completion message interface
 */
export interface OpenAIChatCompletionMessage {
  /**
   * The role of the author of this message. One of system, user, or assistant.
   */
  role: 'system' | 'user' | 'assistant';
  /**
   * The contents of the message.
   */
  content: string;
  /**
   * The name of the author of this message. May contain a-z, A-Z, 0-9, and underscores, with a maximum length of 64 characters.
   */
  name?: string;
}

/**
 * OpenAI: Edit response interface
 */
export interface OpenAIEditOptions {
  /**
   * ID of the model to use. You can use the text-davinci-edit-001 or code-davinci-edit-001 model with this endpoint.
   */
  model: string;
  /**
   * The input text to use as a starting point for the edit.
   */
  input?: string;
  /**
   * The instruction that tells the model how to edit the prompt.
   */
  instruction: string;
  /**
   * How many edits to generate for the input and instruction.
   */
  n?: number;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   *
   * We generally recommend altering this or top_p but not both.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number;
}

/**
 * OpenAI: Edit response interface
 */
export interface OpenAIEditResponse {
  object: 'edit';
  created_at: number;
  choices: {
    index: number;
    text: string;
  }[];
  usage: OpenAITokenUsage;
}

/**
 * OpenAI: List files response interface
 */
export interface OpenAIListFilesResponse {
  data: OpenAIBaseFile[];
  object: 'list';
}

/**
 * OpenAI: Upload file response interface
 */
export interface OpenAIUploadFileResponse extends OpenAIBaseFile {}

/**
 * OpenAI: Delete file response interface
 */
export interface OpenAIDeleteFileResponse {
  id: string;
  object: string;
  deleted: boolean;
}

/**
 * OpenAI: Retrieve file response interface
 */
export interface OpenAIRetrieveFileResponse extends OpenAIBaseFile {}

/**
 * OpenAI: Create fine-tune options interface
 */
export interface OpenAIFineTuningOptions {
  /**
   * The ID of an uploaded file that contains training data.
   *
   * See upload file for how to upload a file.
   *
   * Your dataset must be formatted as a JSONL file, where each training example is a JSON object with the keys "prompt" and "completion". Additionally, you must upload your file with the purpose fine-tune.
   * @see https://platform.openai.com/docs/guides/fine-tuning/creating-training-data
   */
  training_file: string;
  /**
   * The ID of an uploaded file that contains validation data.
   *
   * If you provide this file, the data is used to generate validation metrics periodically during fine-tuning. These metrics can be viewed in the fine-tuning results file. Your train and validation data should be mutually exclusive.
   *
   * Your dataset must be formatted as a JSONL file, where each validation example is a JSON object with the keys "prompt" and "completion". Additionally, you must upload your file with the purpose fine-tune.
   * @see https://platform.openai.com/docs/guides/fine-tuning/creating-training-data
   */
  validation_file?: string;
  /**
   * The name of the base model to fine-tune. You can select one of "ada", "babbage", "curie", "davinci", or a fine-tuned model created after 2022-04-21. To learn more about these models, see the Models documentation.
   * @see https://platform.openai.com/docs/models
   */
  model?: string;
  /**
   * The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.
   */
  n_epochs?: number;
  /**
   * The batch size to use for training. The batch size is the number of training examples used to train a single forward and backward pass.
   *
   * By default, the batch size will be dynamically configured to be ~0.2% of the number of examples in the training set, capped at 256 - in general, we've found that larger batch sizes tend to work better for larger datasets.
   */
  batch_size?: number;
  /**
   * The learning rate multiplier to use for training. The fine-tuning learning rate is the original learning rate used for pretraining multiplied by this value.
   *
   * By default, the learning rate multiplier is the 0.05, 0.1, or 0.2 depending on final batch_size (larger learning rates tend to perform better with larger batch sizes). We recommend experimenting with values in the range 0.02 to 0.2 to see what produces the best results.
   */
  learning_rate_multiplier?: number;
  /**
   * The weight to use for loss on the prompt tokens. This controls how much the model tries to learn to generate the prompt (as compared to the completion which always has a weight of 1.0), and can add a stabilizing effect to training when completions are short.
   *
   * If prompts are extremely long (relative to completions), it may make sense to reduce this weight so as to avoid over-prioritizing learning the prompt.
   */
  prompt_loss_weight?: number;
  /**
   * If set, we calculate classification-specific metrics such as accuracy and F-1 score using the validation set at the end of every epoch. These metrics can be viewed in the results file.
   *
   * In order to compute classification metrics, you must provide a validation_file. Additionally, you must specify classification_n_classes for multiclass classification or classification_positive_class for binary classification.
   */
  compute_classification_metrics?: boolean;
  /**
   * The number of classes in a classification task.
   *
   * This parameter is required for multiclass classification.
   */
  classification_n_classes?: number;
  /**
   * The positive class in binary classification.
   *
   * This parameter is needed to generate precision, recall, and F1 metrics when doing binary classification.
   */
  classification_positive_class?: string;
  /**
   * If this is provided, we calculate F-beta scores at the specified beta values. The F-beta score is a generalization of F-1 score. This is only used for binary classification.
   *
   * With a beta of 1 (i.e. the F-1 score), precision and recall are given the same weight. A larger beta score puts more weight on recall and less on precision. A smaller beta score puts more weight on precision and less on recall.
   */
  classification_betas?: any[];
  /**
   * A string of up to 40 characters that will be added to your fine-tuned model name.
   *
   * For example, a suffix of "custom-model-name" would produce a model name like ada:ft-your-org:custom-model-name-2022-02-15-04-21-04.
   */
  suffix?: string;
}

/**
 * OpenAI: Create fine-tune response interface
 */
export interface OpenAICreateFineTuneResponse extends OpenAIFineTune {}

/**
 * OpenAI: List fine-tunes response interface
 */
export interface OpenAIListFineTunesResponse {
  object: 'list';
  data: OpenAIFineTune[];
}

/**
 * OpenAI: Retrieve fine-tune response interface
 */
export interface OpenAIRetrieveFineTuneResponse extends OpenAIFineTune {}

/**
 * OpenAI: Cancel fine-tune response interface
 */
export interface OpenAICancelFineTuneResponse extends OpenAIFineTune {}

/**
 * OpenAI: List fine-tune events response interface
 */
export interface OpenAIListFineTuneEventsResponse {
  object: 'list';
  data: OpenAIFineTuneEvent[];
}

/**
 * OpenAI: List fine-tune results response interface
 */
export interface OpenAIDeleteFineTuneResponse {
  id: string;
  object: 'model';
  deleted: boolean;
}

/**
 * OpenAI: Moderation options interface
 */
export interface OpenAIModerationOptions {
  /**
   * The input text to classify
   */
  input: string;
  /**
   * Two content moderations models are available: text-moderation-stable and text-moderation-latest.
   *
   * The default is text-moderation-latest which will be automatically upgraded over time. This ensures you are always using our most accurate model. If you use text-moderation-stable, we will provide advanced notice before updating the model. Accuracy of text-moderation-stable may be slightly lower than for text-moderation-latest.
   */
  model?: string;
}

/**
 * OpenAI: Create moderation response interface
 */
export interface OpenAICreateModerationResponse {
  id: string;
  model: string;
  results: {
    categories: {
      hate: boolean;
      'hate/threatening': boolean;
      'self-harm': boolean;
      sexual: boolean;
      'sexual/minors': boolean;
      violence: boolean;
      'violence/graphic': boolean;
    };
    category_scores: {
      hate: number;
      'hate/threatening': number;
      'self-harm': number;
      sexual: number;
      'sexual/minors': number;
      violence: number;
      'violence/graphic': number;
    };
    flagged: boolean;
  }[];
}

/**
 * OpenAI: OpenAI engine interface
 * @deprecated
 */
export interface OpenAIEngine {
  id: string;
  object: 'engine';
  owner: string;
  ready: boolean;
}

/**
 * OpenAI: List engines response interface
 * @deprecated
 */
export interface OpenAIListEnginesResponse {
  data: OpenAIEngine[];
  object: 'list';
}

/**
 * OpenAI: Retrieve engine response interface
 * @deprecated
 */
export interface OpenAIRetrieveEngineResponse extends OpenAIEngine {}
