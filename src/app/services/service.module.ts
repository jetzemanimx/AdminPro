import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuard, UploadFileService} from './service.index';
import { ModalUploadService } from '../componets/modal-upload/modal-upload.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuard, UploadFileService, ModalUploadService],
})
export class ServiceModule {}
