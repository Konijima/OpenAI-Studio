export interface SaveDialogOpts {
  /**
   * The dialog title. Cannot be displayed on some _Linux_ desktop environments.
   */
  title?: string;
  /**
   * Absolute directory path, absolute file path, or file name to use by default.
   */
  defaultPath?: string;
  /**
   * Custom label for the confirmation button, when left empty the default label will
   * be used.
   */
  buttonLabel?: string;
  filters?: string[];
  /**
   * Message to display above text fields.
   *
   * @platform darwin
   */
  message?: string;
  /**
   * Custom label for the text displayed in front of the filename text field.
   *
   * @platform darwin
   */
  nameFieldLabel?: string;
  /**
   * Show the tags input box, defaults to `true`.
   *
   * @platform darwin
   */
  showsTagField?: boolean;
}

export interface ConfirmDialogOpts {
  message: string;
  type: 'none' | 'info' | 'error' | 'question' | 'warning';
  title: string;
  buttons: string[];
}
