import styled from 'styled-components';
import { useRef } from 'react';

const OPTIONS = [
  { value: 'recent', name: '최신순' },
  { value: 'old', name: '오래된 순' },
  { value: 'money', name: '절약금액 순' }
];

const SelectBoxWrapper = styled.div`
  display: flex;
`;

export const Select = styled.select``;

const IconSVG = styled.svg`
  margin-left: -208px;
  align-self: center;
  width: 24px;
  height: 24px;
`;

function App() {
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };

  const selectRef = useRef(null);

  return (
    <select className="selectbox" ref={selectRef} onChange={handleChange}>
      {OPTIONS.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );

  // <SelectBox options={OPTIONS} defaultValue="banana"></SelectBox>;
}

export default App;
