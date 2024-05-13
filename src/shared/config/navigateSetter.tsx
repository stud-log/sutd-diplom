import AppHistory from './history';
import { useNavigate } from 'react-router-dom';

const NavigateSetter = () => {
  AppHistory.navigate = useNavigate();

  return null;
};

export default NavigateSetter;