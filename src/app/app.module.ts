import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, NavComponent, AboutMeComponent, ExperienceComponent, EducationComponent, SkillsComponent, ProyectsComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
