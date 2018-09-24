import { ComponentModalConfig, ModalSize } from 'ng2-semantic-ui';
import { TransferenceComponent } from './transference.component';


export class TransferenceModal extends ComponentModalConfig<void, void, void> {
  constructor( size = ModalSize.Small) {
      super(TransferenceComponent);

      this.isClosable = false;
      this.transitionDuration = 200;
      this.size = size;
  }
}
