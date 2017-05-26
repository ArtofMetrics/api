// External Dependencies
import { NgModule } from '@angular/core';
import { AceEditorDirective } from 'ng2-ace';

// AOM Dependencies
import { ToggleLanguageComponent } from './toggle-language.component';

@NgModule({
  declarations: [ToggleLanguageComponent, AceEditorDirective],
  exports: [ToggleLanguageComponent, AceEditorDirective]
})

export class SharedCourseModule {}
