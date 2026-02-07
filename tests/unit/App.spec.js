import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('renders the app header', () => {
    const wrapper = shallowMount(App, {
      stubs: {
        StateTable: true,
        CityTable: true,
      },
    });
    expect(wrapper.find('.app-header').exists()).toBe(true);
    expect(wrapper.text()).toMatch(/GeoNames Vue/);
  });

  it('has a search input for city and state', () => {
    const wrapper = shallowMount(App, {
      stubs: {
        StateTable: true,
        CityTable: true,
      },
    });
    const input = wrapper.find('#geonames-search');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toMatch(/city or state/);
  });

  it('passes searchQuery to StateTable and CityTable', async () => {
    const wrapper = shallowMount(App, {
      stubs: {
        StateTable: true,
        CityTable: true,
      },
    });
    await wrapper.setData({ searchQuery: 'Rio' });
    await wrapper.vm.$nextTick();
    // Stubbed child components still receive props from parent
    const children = wrapper.vm.$children;
    expect(children.length).toBe(2);
    expect(children[0].$props.searchQuery).toBe('Rio');
    expect(children[1].$props.searchQuery).toBe('Rio');
  });

  it('toggles dark theme on button click', async () => {
    const wrapper = shallowMount(App, {
      stubs: {
        StateTable: true,
        CityTable: true,
      },
    });
    expect(wrapper.vm.darkTheme).toBe(false);
    await wrapper.find('.theme-toggle').trigger('click');
    expect(wrapper.vm.darkTheme).toBe(true);
    await wrapper.find('.theme-toggle').trigger('click');
    expect(wrapper.vm.darkTheme).toBe(false);
  });
});
