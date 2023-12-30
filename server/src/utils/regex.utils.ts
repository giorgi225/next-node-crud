class Regex {
  public static isMultilingualAlpha(value: string) {
    const multilingualAlphaRegex = /^[A-Za-z\u{10D0}-\u{10F1}]+$/u;
    return multilingualAlphaRegex.test(value);
  }
}

export default Regex;
