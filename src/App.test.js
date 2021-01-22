import { shallow, mount } from 'enzyme';
import App from './App';
import Sidebar from '../src/components/Sidebar';
import Talent from '../src/components/Talent';
import TalentItem from '../src/components/TalentItem';
import Filter from '../src/components/Filter';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders the sidebar', () => {
  shallow(<Sidebar />);
});

//This component has two props so we pass in an error so that it will load
it('renders the main container', () => {
  shallow(<Talent talent="" error="This is an error" />);
});

it('renders the filter component', () => {
  shallow(<Filter />);
});

//Check that the Talent Item renders user details
//Fake data
const profile = {
  name: {
    first: 'Homer',
    last: 'Simpson',
  },
  location: {
    city: 'Springfield',
  },
  dob: {
    date: '1946-05-30T13:34:45.936Z',
  },
  picture: {
    medium: 'https://randomuser.me/api/portraits/med/men/0.jpg',
  },
};
describe('', () => {
  it('accepts profile props', () => {
    const wrapper = mount(<TalentItem profile={profile} />);
    expect(wrapper.props().profile).toEqual(profile);
  });
  it('contains user first name', () => {
    const wrapper = mount(<TalentItem profile={profile} />);
    const value = wrapper.find('h3').text();
    expect(value).toEqual('Homer Simpson');
  });
});

//Note with more development time we would check the filter is functioning with a test plus all other components
//It could also have been built with a TDD approach with tests written prior to content created.
