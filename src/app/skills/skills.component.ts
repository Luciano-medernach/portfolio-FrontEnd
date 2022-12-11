import { Component } from '@angular/core';
import { SkillService } from '../services/skill.service';
import { Skill } from '../shared/skill.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  skills!: Array<Skill>;

  constructor(private skillService: SkillService) {}

  getSkills() {
    this.skillService
      .getSkills()
      .subscribe((data: Array<Skill>) => (this.skills = data));
  }

  ngOnInit(): void {
    this.getSkills();
  }
}
