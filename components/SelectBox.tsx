import styled from 'styled-components';

const OPTIONS = [
  { value: 'apple', name: '최신순' },
  { value: 'banana', name: '오랜된 순' },
  { value: 'orange', name: '절약금액 순' }
];

const SelectBoxWrapper = styled.div`
  display: flex;
`;

export const Select = styled.select`
  font-family: 'Pretendard';
  border: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  height: 24px;
  margin-top: 8px;
  outline: 0;
  appearance: none;

  background: url(/icons/ic_selectbox_arrow.svg) no-repeat left 36px center;

  // margin: 0;
  // min-width: 0;
  // display: block;
  // width: 100%;
  // padding: 8px 8px;
  // font-size: inherit;
  // line-height: inherit;
  // border: 1px solid;
  // border-radius: 4px;
  // color: inherit;
  // background-color: transparent;
  // -webkit-appearance: none;
  // -moz-appearance: none;
  // appearance: none;
  // &:focus {
  //   border-color: red;
  // }
`;

const IconSVG = styled.svg`
  margin-left: -28px;
  align-self: center;
  width: 24px;
  height: 24px;
`;

const SelectBox = (props: any) => {
  const handleChange = (e: any) => {
    // event handler
    console.log(e.target.value);
  };

  return (
    <SelectBoxWrapper>
      <Select onChange={handleChange}>
        {props.options.map((option: any) => (
          // defaultValue={props.defaultValue === option.value}
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>
      <IconSVG>
        <img src="/icons/ic_selectbox_arrow.svg" />
      </IconSVG>
    </SelectBoxWrapper>
  );
};

function App() {
  return <SelectBox options={OPTIONS} defaultValue="banana"></SelectBox>;
}

export default App;
