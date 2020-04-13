import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonParser'
})
export class JsonParse implements PipeTransform {
  transform(value: string): string {
    return JSON.parse(value);
  }
}
