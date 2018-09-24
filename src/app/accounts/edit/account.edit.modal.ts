import { ComponentModalConfig, ModalSize } from 'ng2-semantic-ui';
import { EditComponent } from './edit.component';

interface IEditModalContext {
  name: string;
  status_id: string;
}

export class AccountsEditModal extends ComponentModalConfig<IEditModalContext, void, void> {
  constructor(name: string, status_id: string, size = ModalSize.Small) {
      super(EditComponent, { name, status_id });

      this.isClosable = false;
      this.transitionDuration = 200;
      this.size = size;
  }
}
