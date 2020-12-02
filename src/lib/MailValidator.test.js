import MailValidator from './MailValidator';

describe('Mail validator', () => {
  it('妥当な場合は成功を返す', () => {});
  it('空の場合は失敗を返す', () => {});
  it('フォーマットが異なる場合は失敗を返す', () => {});
});

describe('password validator', () => {
  it("妥当な場合は成功を返す", () => {
    const Mail = "samplePass1";
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
        expect(res.message).toBe('フォーマットが異なります。')
      });
  })
});