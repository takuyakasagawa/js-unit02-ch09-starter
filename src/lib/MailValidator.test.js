import MailValidator from './MailValidator';

describe('Mail validator', () => {
  it("妥当な場合は成功を返す", () => {
    const mail = "test@test.com";
    const validator = new MailValidator(mail);
    return validator.validate()
      .then((res) => {
        expect(res).toEqual({
          success: true
        });
    });
  });

  it("空の場合は失敗を返す", () => {
    const mail = "";
    const validator = new MailValidator(mail);
    return validator.validate()
      .then((res) => {
        expect(res.success).toBeFalsy();
        expect(res.message).toBe('メールアドレスは必須です。')
      });
  })

  it("フォーマットが異なる場合は失敗を返す", () => {
    const mail = "test";
    const validator = new MailValidator(mail);
    return validator.validate()
      .then((res) => {
        expect(res.success).toBeFalsy();
        expect(res.message).toBe(`メールアドレスのフォーマットが異なります。`)
      });
  })
});

// this.typeはMailValidatorファイル内はsuperを使ってBaseValidatorから継承させていますが、このテストファイルには継承されていないので、値が取得できません。
// 「メールアドレスのフォーマットが異なります」という文字列を指定して等しくなるようにしましょう。
// ヒント: 変数名などを使う必要がないということです