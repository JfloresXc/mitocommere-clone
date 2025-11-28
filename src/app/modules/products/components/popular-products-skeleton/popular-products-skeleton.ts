import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-products-skeleton',
  standalone: true,
  template: `
    <section class="section-popular-product-shape relative pb-[100px] max-[1200px]:pb-[70px] mt-[100px]">
      <div class="popular-product-container flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div class="flex flex-wrap w-full">
          <div class="w-full px-[12px]">
            <div class="mb-[30px]">
              <div class="cr-banner mb-[15px] text-center flex flex-col items-center">
                <!-- Title Skeleton -->
                <div class="h-[32px] w-[300px] bg-gray-200 rounded animate-pulse mb-2"></div>
              </div>
              <div class="cr-banner-sub-title w-full flex flex-col items-center">
                <!-- Subtitle Skeleton -->
                <div class="h-[14px] w-[500px] bg-gray-200 rounded animate-pulse mb-1"></div>
                <div class="h-[14px] w-[400px] bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-content flex flex-wrap w-full mb-[-24px]">
          <div class="w-full mb-[24px]">
            <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-[24px] w-full">
              @for (item of [1, 2, 3, 4, 5]; track item) {
                <div class="border border-[#eee] rounded-[5px] p-[20px] bg-white">
                  <!-- Image Skeleton -->
                  <div class="w-full h-[200px] bg-gray-200 rounded-[5px] animate-pulse mb-[15px]"></div>
                  <!-- Content Skeleton -->
                  <div class="flex flex-col gap-2">
                    <div class="h-[12px] w-[30%] bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-[16px] w-[80%] bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-[14px] w-[40%] bg-gray-200 rounded animate-pulse mt-2"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PopularProductsSkeleton {}
