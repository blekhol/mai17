import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Vasarlas } from './Vasarlas.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      elozo: {}
    }
  }

  @Post("/")
  @Render("index")
  vasarlas(@Body() body: Vasarlas) {
    const errors: string[] = [];

    const nevRegex = /^[a-zA-ZíöüóőúéáűÍÖÜÓŐÚÉÁŰ]+ [a-zA-ZíöüóőúéáűÍÖÜÓŐÚÉÁŰ]+$/;

    if (!body.termek) {
      errors.push("Nincs kiválasztva termék")
    }
    if (!nevRegex.test(body.nev.trim()))
    {
      errors.push("Helytelen név")
    }
    if (!body.szamlazasi){
      errors.push("Nincs megadva számlázási cím")
    }
    if (!body.szallitasi){
      errors.push("Nincs megadva szállítási cím")
    }
    if (!body.telefonszam.startsWith("+36") || body.telefonszam.trim().replaceAll(" ", "").length != 12 || isNaN(parseInt(body.telefonszam.trim().split("+")[1].replaceAll(" ", "")))) {
      errors.push("Helytelen telefonszám")
    }
    

    return {
      errors: errors,
      elozo: body
    }
  }
}
