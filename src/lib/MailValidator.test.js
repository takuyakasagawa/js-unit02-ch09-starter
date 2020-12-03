import MailValidator from './MailValidator';

describe('Mail validator', () => {
  it("妥当な場合は成功を返す", () => {
    const Mail = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    const validator = new MailValidator(Mail);
    return validator.validate()
      .then((res) => {
        expect(res).toEqual({
          success: true
        });
    });
  });

  it("空の場合は失敗を返す", () => {
    const Mail = "";
    const validator = new MailValidator(Mail);
    return validator.validate()
      .then((res) => {
        expect(res.success).toBeFalsy();
        expect(res.message).toBe('メールアドレスは必須です。')
      });
  })

  it("フォーマットが異なる場合は失敗を返す", () => {
    const Mail = "test";
    const validator = new MailValidator(Mail);
    return validator.validate()
      .then((res) => {
        expect(res.success).toBeFalsy();
        expect(res.message).toBe(`${this.type}のフォーマットが異なります。`)
      });
  })
});