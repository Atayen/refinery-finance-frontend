import React from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import nextId from 'react-id-generator';

import { Button, InputNumber, Switch } from '../../../atoms';
import { ISettings } from '../Swap';

import './ExchangeSettings.scss';

import CrossImg from '../../../../assets/img/icons/cross.svg';

export interface IActiveSlippage {
  type: 'btn' | 'input';
  value: number;
}

interface IExchangeSettings {
  savedSettings: ISettings;
  handleSave: (settings: ISettings) => void;
}

const ExchangeSettings: React.FC<IExchangeSettings> = React.memo(
  ({ savedSettings, handleSave }) => {
    const history = useHistory();
    const [slippage, setSlippage] = React.useState<IActiveSlippage>(savedSettings.slippage);
    const [txDeadline, SetTxDeadline] = React.useState<number>(savedSettings.txDeadline);

    const [slippageInputValue, setSlippageInputValue] = React.useState<number>(
      savedSettings.slippage.type === 'input' ? savedSettings.slippage.value : NaN,
    );
    const btns = [0.1, 0.5, 1];

    const handleSaveSettings = () => {
      handleSave({
        slippage,
        txDeadline,
      });
      history.goBack();
    };

    const handleChangeSlippage = (data: IActiveSlippage): void => {
      setSlippage(data);
    };

    const handleChangeTxDeadline = (value: number | string): void => {
      SetTxDeadline(+value);
    };

    const handleFocusSlippageInput = () => {
      if (+slippageInputValue) {
        handleChangeSlippage({
          type: 'input',
          value: slippageInputValue,
        });
      }
    };

    const handleChangeSlippageInput = (value: number | string) => {
      setSlippageInputValue(+value);
      if (+value) {
        handleChangeSlippage({
          type: 'input',
          value: +value,
        });
      } else {
        handleChangeSlippage({ type: 'btn', value: 0.1 });
      }
    };

    const handleClose = (): void => {
      history.goBack();
    };

    return (
      <div className="exchange exch-settings box-shadow box-white">
        <div className="box-f-jc-sb box-f-ai-c exch-settings__box-title">
          <div className="text-med text-purple text-md">Advanced Settings</div>
          <div
            className="exch-settings__close"
            onClick={handleClose}
            onKeyDown={handleClose}
            role="link"
            tabIndex={0}
          >
            <img src={CrossImg} alt="" />
          </div>
        </div>
        <div className="exch-settings__section">
          <div className="exch-settings__section-title text-med text-purple">
            Slippage tolerance
          </div>
          <div className="box-f box-f-jc-sb">
            {btns.map((btn) => (
              <Button
                key={nextId()}
                size="sm"
                colorScheme="outline"
                onClick={() => handleChangeSlippage({ type: 'btn', value: btn })}
                className={cn('exch-settings__slippage-btn', {
                  active: slippage.type === 'btn' && slippage.value === btn,
                })}
              >
                {btn}%
              </Button>
            ))}
            <InputNumber
              value={slippageInputValue}
              colorScheme="outline"
              inputSize="sm"
              inputPrefix="%"
              onFocus={handleFocusSlippageInput}
              onChange={handleChangeSlippageInput}
              className={cn('exch-settings__slippage-input', {
                active: slippage.type === 'input' && slippage.value,
              })}
            />
          </div>
        </div>
        <div className="exch-settings__section">
          <div className="exch-settings__section-title text-med text-purple">
            Transaction deadline
          </div>
          <div className="box-f-ai-c">
            <InputNumber
              colorScheme="outline"
              inputSize="sm"
              value={txDeadline}
              onChange={handleChangeTxDeadline}
              className="exch-settings__txdeadline-input"
              placeholder="0"
            />
            <span className="text-med text-gray">Minutes</span>
          </div>
        </div>
        <div className="exch-settings__section">
          <div className="exch-settings__section-title text-med text-purple">Audio</div>
          <Switch colorScheme="purple" switchSize="bg" />
        </div>
        <Button className="exch-settings__btn" onClick={handleSaveSettings}>
          <span className="text-smd text-white">Save and close</span>
        </Button>
      </div>
    );
  },
);

export default ExchangeSettings;
