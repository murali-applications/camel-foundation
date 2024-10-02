import { Component, AfterViewInit } from '@angular/core';
import Isotope from 'isotope-layout';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements AfterViewInit {

  ngAfterViewInit() {
    const portfolioContainer = document.querySelector('.portfolio-container') as HTMLElement;

    if (portfolioContainer) {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      const portfolioFilters = document.querySelectorAll('#portfolio-flters li');

      portfolioFilters.forEach((filter: any) => {
        filter.addEventListener('click', (e: any) => {
          e.preventDefault();
          portfolioFilters.forEach((el) => el.classList.remove('filter-active'));
          filter.classList.add('filter-active');

          const filterValue = filter.getAttribute('data-filter');
          portfolioIsotope.arrange({ filter: filterValue });
        });
      });
    }
  }
}