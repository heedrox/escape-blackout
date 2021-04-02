import { shallowMount } from '@vue/test-utils';
import App from './App';
import firebaseUtil from './lib/firebase/firebase-util.js';
import Desktop from './components/Desktop';

describe('App', () => {
  describe('when correct login', () => {
    beforeEach(() => {
      firebaseUtil.login = jest.fn();
      firebaseUtil.login.mockReturnValueOnce(new Promise((resolve, _) => resolve(true)));
    });

    it('changes state to LOGGED_IN', async () =>{
      const wrapper = shallowMount(App);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.state).toBe('LOGGED_IN');
    });
    it('shows desktop', async () => {
      const wrapper = shallowMount(App);
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(Desktop).exists()).toBeTruthy();
      expect(wrapper.text()).not.toMatch('error');
    });
  });

  describe('when wrong login', () => {
    beforeEach(() => {
      firebaseUtil.login = jest.fn();
      firebaseUtil.login.mockReturnValueOnce(new Promise((_, reject) => reject(false)));
    });

    it('changes state to ERROR', async () => {
      const wrapper = shallowMount(App);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.state).toBe('ERROR');
    });

    it('hides desktop', async () => {
      const wrapper = shallowMount(App);
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(Desktop).exists()).toBeFalsy();
      expect(wrapper.text()).toMatch('error');
    });
  });
});
