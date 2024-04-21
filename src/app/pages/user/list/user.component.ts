import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/shared/domains/user/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private auxName: string = '';
  users!: User[];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {  }

  ngOnInit(): void {
    this.list();
  }

  set nameUserDB(name: string) {
    this.auxName = name;
  }

  valueChange(user: User): boolean {
    return user.name?.trim() != this.auxName?.trim();
  }

  editing(user: User) {
    user.editing = !user.editing;
    this.auxName = user.name;
    if (user.editing) {
      setTimeout(() => {
        const inputField = document.getElementById(`input_${user.id}`) as HTMLInputElement;
        if (inputField) {
          inputField.focus();
        }
      }, 0); // Pequeno atraso de 0 ms para permitir que o DOM seja atualizado
    }
  }

  blur(user: User) {
    if(this.valueChange(user)) {
      return;
    }
    this.canceling(user);
  }

  canceling(user: User) {
    user.editing = false;
    user.name = this.auxName;
    this.auxName = '';
  }

  list() {
    this.userService.findAll().subscribe({
      next: (response) => {
        this.users = response;
        if(this.users.length == 0) this.messageService.add({severity:'warn', summary: 'Alerta', detail: 'Nenhum registro encontrado.'});
        else this.users.forEach(u => u.editing = false)
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  remove(id: number) {
    this.confirmationService.confirm({
      message: '<b>Deseja excluir este registro?</b> <br/> Está operação não poderá ser desfeita.',
      header: 'Excluir Usuário',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteById(id).subscribe({
          next: (response) => {
            this.messageService.add({severity:'success', summary: 'Successo', detail: 'Usuário excluído com sucesso.'});
            this.list();
          },
          error: (e) => {
            this.messageService.add({severity:'error', summary: 'Erro', detail: e.error.message});
          }
        })
      },
      key: "positionDialog"
    });
  }

  merge(user: User) {
    if(user.id) {
      user.editing = false;
      this.userService.merge(user, user.id).subscribe({
        next: () =>
          this.messageService.add({severity:'success', summary: 'Successo', detail: 'Usuário editado com sucesso.'}),
        error: (e) =>
          this.messageService.add({severity:'error', summary: 'Erro', detail: e.error.message})
      })
    }
  }

}
