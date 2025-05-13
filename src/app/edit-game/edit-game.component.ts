import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
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

  availablePlatforms = [
    'Sony PlayStation',
    'Xbox Series',
    'Nintendo Switch',
    'PC',
  ];
  availableTags = ['Action', 'RPG', 'Adventure', 'Multiplayer'];

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
      tags: this.fb.array(this.availableTags.map(() => this.fb.control(false))),
      platforms: this.fb.array(
        this.availablePlatforms.map(() => this.fb.control(false))
      ),
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
          developer: game.developer,
          releaseDate: game.releaseDate?.substring(0, 10),
        });

        this.patchCheckboxArray(game.tags ?? [], this.availableTags, 'tags');
        this.patchCheckboxArray(
          game.platforms ?? [],
          this.availablePlatforms,
          'platforms'
        );
      });
    }
  }

  patchCheckboxArray(
    values: string[],
    available: string[],
    controlName: string
  ) {
    const formArray = this.gameForm.get(controlName) as FormArray;
    available.forEach((item, i) => {
      formArray.at(i).setValue(values.includes(item));
    });
  }

  onSubmit() {
    if (this.gameForm.invalid) return;

    const selectedTags = this.availableTags.filter(
      (_, i) => this.gameForm.value.tags[i]
    );
    const selectedPlatforms = this.availablePlatforms.filter(
      (_, i) => this.gameForm.value.platforms[i]
    );

    const payload = {
      ...this.gameForm.value,
      tags: selectedTags,
      platforms: selectedPlatforms,
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
