import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-game',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-game.component.html',
})
export class EditGameComponent implements OnInit {
  gameForm!: FormGroup;
  isEditMode: boolean = false;
  slug: string | null = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isEditMode = !!this.slug;

    this.gameForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      genre: [''],
      tags: [''],
      platform: [''],
      developer: [''],
      releaseDate: [''],
    });

    if (this.isEditMode && this.slug) {
      this.gameService.getGameBySlug(this.slug).subscribe((game) => {
        this.gameForm.patchValue({
          title: game.title,
          description: game.description,
          price: game.price,
          image: game.image,
          genre: game.genre,
          tags: (game.tags || []).join(', '),
          platform: game.platforms,
          developer: game.developer,
          releaseDate: game.releaseDate?.substring(0, 10),
        });
      });
    }
  }

  onSubmit() {
    if (this.gameForm.invalid) return;

    const formValue = this.gameForm.value;
    const payload = {
      ...formValue,
      tags: formValue.tags.split(',').map((t: string) => t.trim()),
    };

    if (this.isEditMode && this.slug) {
      this.gameService.updateGame(this.slug, payload).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    } else {
      this.gameService.createGame(payload).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
