import { mount } from '@vue/test-utils'
import Login from '../../src/views/Login.vue'

test('login button disabled', async () => {
  const wrapper = mount(Login)
  let btn:any=await wrapper.get('button');
  expect(btn.isDisabled()).toBe(true);
  await wrapper.get('input[type="text"]').setValue('aaa');
  await wrapper.get('input[type="password"]').setValue('111')
  btn=await wrapper.get('button');
  //console.log(btn);
  expect(btn.isDisabled()).toBe(false);
})