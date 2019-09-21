import { createNamespace } from '../utils';
import { BLUE, GRAY_DARK } from '../utils/constant';
import { switchProps, SharedSwitchProps } from './shared';
import { emit, inherit } from '../utils/functional';
import Loading from '../loading';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../utils/types';

export type SwitchEvents = {
  onChange?(checked: boolean): void;
};

const [createComponent, bem] = createNamespace('switch');

function Switch(
  h: CreateElement,
  props: SharedSwitchProps,
  slots: DefaultSlots,
  ctx: RenderContext<SharedSwitchProps>
) {
  const {
    size,
    value,
    loading,
    disabled,
    activeColor,
    activeValue,
    inactiveColor,
    inactiveValue
  } = props;

  const checked = value === activeValue;

  const switchStyle = {
    fontSize: size,
    backgroundColor: checked ? activeColor : inactiveColor
  };

  const loadingColor = checked ? activeColor || BLUE : inactiveColor || GRAY_DARK;

  function onClick() {
    if (!disabled && !loading) {
      const newValue = checked ? inactiveValue : activeValue;
      emit(ctx, 'input', newValue);
      emit(ctx, 'change', newValue);
    }
  }

  return (
    <div
      class={bem({
        on: checked,
        disabled
      })}
      role="switch"
      style={switchStyle}
      aria-checked={String(checked)}
      onClick={onClick}
      {...inherit(ctx)}
    >
      <div class={bem('node')}>
        {loading && <Loading class={bem('loading')} color={loadingColor} />}
      </div>
    </div>
  );
}

Switch.props = switchProps;

export default createComponent<SharedSwitchProps, SwitchEvents>(Switch);
