const {expect, test} = require('@oclif/test')

describe('config', () => {
  test
  .stdout()
  .command(['config'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('Error: Missing 2 required args:')
  })

  test
  .stdout()
  .command(['config', 'compiler', 'test'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('')
  })
})