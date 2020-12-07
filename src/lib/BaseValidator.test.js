import BaseValidator from './BaseValidator';

describe('Base validator', () => {
	it('妥当な場合は成功を返す', () => {
		const base = "";
		const validator = new BaseValidator(base);
    return validator.validate()
      .then((res) => {
        expect(res).toEqual({
          success: true
        });
    });
  });

	it("空の場合は失敗を返す", () => {
    const base = "";
    const validator = new BaseValidator(base);
    return validator.validate()
      .then((res) => {
        expect(res.success).toBeFalsy();
        expect(res.message).toBe('入力は必須です。')
      });
  })
});