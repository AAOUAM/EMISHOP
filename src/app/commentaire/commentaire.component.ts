import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
export class CommentaireComponent implements OnInit{

  ngOnInit(): void {

  }
  @Output() LesCommentiares = new EventEmitter<Commentaire>();

  commentaireForm: FormGroup;

  commentaire!: Commentaire ;
  nextId: number = 1;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire
    this.commentaireForm = this.fb.group({
      user: ['', Validators.required],
      contenu: ['', Validators.required],
      rating: ['', Validators.required] // Ajout du champ rating
    });
  }

  ajouterCommentaire(): void {
    if (this.commentaireForm.valid) {
      const nouveauCommentaire: Commentaire = {
        user: this.commentaireForm.value.user,  // Correspond à 'user' dans le formulaire
        comment: this.commentaireForm.value.contenu,  // Correspond à 'comment' dans le formulaire
        rating: this.commentaireForm.value.rating, // Nouveau champ 'rating'
        date: new Date()
      };


      this.commentaire = nouveauCommentaire ;
      this.LesCommentiares.emit(this.commentaire);


      // Réinitialiser le formulaire
      this.commentaireForm.reset();
    }
  }

}

