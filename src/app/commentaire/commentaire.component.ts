import { Component } from '@angular/core';
import {Commentaire} from "../Models/Commentaire";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-commentaire',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    NgForOf
  ],
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})
export class CommentaireComponent {
  commentaireForm: FormGroup;
  commentaires: Commentaire[] = [];
  nextId: number = 1;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire
    this.commentaireForm = this.fb.group({
      user: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ajouterCommentaire(): void {
    if (this.commentaireForm.valid) {
      const nouveauCommentaire: Commentaire = {
        user: this.commentaireForm.value.auteur,
        comment: this.commentaireForm.value.contenu,
        date: new Date(),
        rating : this.commentaireForm.value.rating
      };

      // Ajouter le commentaire au tableau
      this.commentaires.push(nouveauCommentaire);

      // Réinitialiser le formulaire
      this.commentaireForm.reset();
    }
  }
}
