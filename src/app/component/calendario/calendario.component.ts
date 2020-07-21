import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    ViewChild,
    TemplateRef
  } from '@angular/core';
  import { DOCUMENT } from "@angular/common";
  import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
  
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
  } from 'date-fns';
  
  import { Subject } from 'rxjs';
  
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
  } from 'angular-calendar';

  import { registerLocaleData } from '@angular/common';
  import localeEs from '@angular/common/locales/es';
import { CalendarioService } from '../../services/calendario.service';
import { calendarioModel } from './calendarioModel';
import { customerModel } from 'src/app/model/customerModel';
import { customerBranchModel } from 'src/app/model/customerBranchModel';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerBranchService } from 'src/app/services/customerbranch.service'

  const colors: any = {
    planeado: {
      primary: '#6665ff',
      secondary: '#FAE3E3'
    },
    enProceso: {
      primary: '#01b0f1',
      secondary: '#D1E8FF'
    },
    cerrado: {
      primary: '#00af54',
      secondary: '#FDF1BA'
    },
    pendiente: {
      primary: '#ffc000',
      secondary: '#FDF1BA'
    },
    cancelado: {
      primary: '#fe0000',
      secondary: '#FDF1BA'
    },
    reprogramado: {
      primary: '#94b9db',
      secondary: '#FDF1BA'
    }
  };


@Component({
    selector: 'app-fullcalendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'calendario.component.html',
    styleUrls: ['fullcalendar.component.css'],
    providers: [CalendarioService,
                CustomerService,
                CustomerBranchService]
})


export class CalendarioComponent {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  esEmpleado;
  comboCliente    = {} as customerModel;
  comboSucursal   = {} as customerBranchModel;
  disabledComboSucursal = true;
  defaultCombosClientes = {
    client_identity:  0,
    commercial_name:  'Seleccione...',
    status: 0
  };
  themecolor='#000000';
  //Combo Sucursales
  sucursales:[{
    branch_client_id: number,
    business_name:    string,
    status:           number
  }];
    //Combo Clientes
    clientes:[{
      client_identity:  number,
      commercial_name:  string,
      status:           number
    }];
  defaultCombosSucursal = {
    branch_client_id: 0,
    business_name:    'Seleccione...',
    status:           0
  };
  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  eventPopClick ={} as CalendarEvent;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil text-white"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times  text-white"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [/*
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }*/
  ];

  activeDayIsOpen = false;

  /*
  start: subDays(startOfDay(new Date()), 1),
  end: addDays(new Date(), 1),
  title: 'A 3 day event',
  color: colors.red,
  actions: this.actions
  */

  constructor(private modal: NgbModal,
              private customer:       CustomerService,
              private customerbranch: CustomerBranchService,
              private calendario: CalendarioService) {
    this.esEmpleado = (localStorage.getItem('esEmpleado')=='1');
    registerLocaleData(localeEs);
      if(this.esEmpleado){
       console.log("es empleado");
       this.customer.obtenerClientes().subscribe( (res: any) => {
        this.cargarCombosClientes(res.data);
        //this.setDefaultCombosCliente();
        this.comboCliente = res.data[1];
        this.cambioCliente(res.data[1].client_identity);
        
      });
    }else{
      this.cargarCalendario(localStorage.getItem('customerBranchId'));
    }
  }
  ngOnInit(){
   
    
  }
  cambioCliente(clienteId) {
    this.customerbranch.obtenerSucursalByCliente(clienteId).subscribe( (res: any) => {
        res.data.unshift(this.defaultCombosSucursal);
        this.sucursales =  res.data;
        /*this.setDefaultCombosSucursal();*/
        this.comboSucursal = res.data[1];
        this.disabledComboSucursal = false;
        this.cargarCalendario(res.data[1].branch_client_id);
    });
  }
  cargarCalendario(sucursalId) {
    console.log("cargar calendario -->>");
    this.events = [];
    this.calendario.obtenerConfiguracionCalendario(sucursalId).subscribe( (res: any) => {
      res.data.calendar.map( (e) => {
        const inicio = e.service_date + ' ' + e.start_time;
        const fin = e.service_date + ' ' + e.end_time;

        const calendario = {} as CalendarEvent; 

        calendario.start = addDays(new Date(inicio), 0);
        calendario.end = addDays(new Date(fin) , 0);
        calendario.title = e.service_description;
        calendario.actions = this.actions;
        switch (e.service_status_id) {
          case 1:
            calendario.color = colors.planeado.primary;
          break;
          case 2:
            calendario.color = colors.enProceso.primary;
          break;
          case 3:
            calendario.color = colors.cerrado.primary;
          break;
          case 4:
            calendario.color = colors.pendiente.primary;
          break;
          case 5:
            calendario.color = colors.cancelado.primary;
          break;
          case 6:
            calendario.color = colors.reprogramado.primary;
          break;
          default:
            calendario.color = colors.planeado.primary;
          break;
        }
        

        this.events.push(calendario);            

      });

      this.refresh.next();
      console.log("eventos-->",this.events);

    });
  }
  eventClicked(event: any) {
    console.log("Evento Anual-->>" , event);
  }
  actionClicked(event: any) {
    console.log("Action Anual -->>" , event);
  }
  setDefaultCombosSucursal() {
    //Sucursal
    this.comboSucursal = this.defaultCombosSucursal;
    this.disabledComboSucursal = true;
  }
  setDefaultCombosCliente() {
    //clientes
    this.comboCliente = this.defaultCombosClientes;
  }
  cargarCombosClientes(data) {
    data.unshift(this.defaultCombosClientes);
    this.clientes  = data;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

}