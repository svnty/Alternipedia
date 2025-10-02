export default function Article({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-white">
      {/* RIGHT SIDEBAR */}
      <div data-property-1="Default" className="w-64 h-[2476px] left-[1507px] top-[159px] absolute overflow-hidden">
        <div className="w-64 h-[693px] left-0 top-[-84px] absolute overflow-hidden">
          <div className="w-64 left-0 top-[84px] absolute inline-flex justify-between items-start">
            <div className="w-64 relative inline-flex flex-col justify-start items-start gap-5">
              <div className="h-9 px-1.5 py-[5px] inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-neutral-800 text-sm font-bold ">Tools</div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Language" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.9399 20.4519H20.5042C20.3612 20.4611 20.2197 20.4186 20.1054 20.3322C20.0049 20.2495 19.9262 20.1434 19.8761 20.0232L18.9489 17.4609H13.9639L12.9669 19.9933C12.9183 20.1088 12.8432 20.2113 12.7476 20.2924C12.6361 20.3859 12.4943 20.4355 12.3488 20.4319H10.9729L15.5093 8.99644H17.3936L21.9399 20.4519ZM18.4205 16.1548L16.8452 11.9774C16.6934 11.5727 16.5636 11.16 16.4564 10.7412C16.3966 10.9871 16.3334 11.2164 16.267 11.4291L16.0775 11.9874L14.5023 16.1648L18.4205 16.1548ZM12.1394 14.5796C11.1191 14.2298 10.145 13.7578 9.23817 13.1738C10.6356 11.673 11.6033 9.82368 12.0397 7.81999H13.9639V6.49399H9.28802C9.2355 6.30319 9.16885 6.11657 9.08862 5.93567C8.84934 5.28762 8.58015 4.5 8.58015 4.5L7.11458 4.9985C7.11458 4.9985 7.51337 5.88582 7.71277 6.49399H2V7.81999H4.14354C4.58042 9.83191 5.56359 11.6844 6.98497 13.1738C5.44448 14.1309 3.76191 14.8376 2 15.2675C2.37221 15.8125 2.66134 16.2712 2.86738 16.6434C4.69948 16.0289 6.44776 15.1883 8.07169 14.1409C9.17468 14.8781 10.3675 15.4712 11.621 15.9056L12.1394 14.5796ZM5.61909 7.81999H10.5143C10.1969 9.52252 9.34057 11.0779 8.07169 12.2566C6.8492 11.0408 5.99845 9.50186 5.61909 7.81999Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Languages</div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Map" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10.5224" cy="12.9257" r="2.33486" fill="#636C7E" />
                        <circle cx="15.6269" cy="5.05657" r="1.55657" fill="#636C7E" />
                        <circle cx="19.6034" cy="11.2831" r="1.55657" fill="#636C7E" />
                        <circle cx="14.0683" cy="20.7958" r="1.55657" fill="#636C7E" />
                        <circle cx="4.55657" cy="17.6825" r="1.55657" fill="#636C7E" />
                        <circle cx="6.11517" cy="7.6513" r="1.55657" fill="#636C7E" />
                        <path d="M10.5249 12.8391L6.11463 7.73696M10.5249 12.8391L15.5405 4.96973M10.5249 12.8391L19.5184 11.196M10.5249 12.8391L13.984 20.5354M10.5249 12.8391L4.64453 17.4223" stroke="#636C7E" strokeWidth="1.28192" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Topic map</div>
                    </div>
                  </div>
                  <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                    <div className="justify-center text-white text-xs font-bold ">PRO</div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Notes" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0997 10.6362C14.0997 11.0912 13.7274 11.4635 13.2724 11.4635H5.82724C5.37226 11.4635 5 11.0912 5 10.6362C5 10.1812 5.37226 9.80898 5.82724 9.80898H13.2724C13.7274 9.80898 14.0997 10.1812 14.0997 10.6362ZM5 7.32724C5 7.78223 5.37226 8.15449 5.82724 8.15449H13.2724C13.7274 8.15449 14.0997 7.78223 14.0997 7.32724C14.0997 6.87226 13.7274 6.5 13.2724 6.5H5.82724C5.37226 6.5 5 6.87226 5 7.32724ZM10.7907 13.9452C10.7907 13.4902 10.4184 13.118 9.96346 13.118H5.82724C5.37226 13.118 5 13.4902 5 13.9452C5 14.4002 5.37226 14.7724 5.82724 14.7724H9.96346C10.4184 14.7724 10.7907 14.4002 10.7907 13.9452ZM17.4169 12.1832L18.0043 11.5958C18.3269 11.2732 18.8481 11.2732 19.1707 11.5958L19.758 12.1832C20.0807 12.5058 20.0807 13.027 19.758 13.3496L19.1707 13.9369L17.4169 12.1832ZM16.8296 12.7705L12.561 17.0391C12.4866 17.1135 12.4452 17.2128 12.4452 17.3286V18.495C12.4452 18.7267 12.6272 18.9087 12.8588 18.9087H14.0252C14.1328 18.9087 14.2403 18.8673 14.3148 18.7846L18.5833 14.516L16.8296 12.7705Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">My Notes</div>
                    </div>
                  </div>
                  <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                    <div className="justify-center text-white text-xs font-bold ">PRO</div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="AI" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4167 14.0833L14 17.5L15.5833 14.0833L19 12.5L15.5833 10.9167L14 7.5L12.4167 10.9167L9 12.5L12.4167 14.0833Z" fill="#636C7E" />
                        <path d="M8.44757 7.28922L9.11839 8.73679L9.78922 7.28922L11.2368 6.61839L9.78922 5.94757L9.11839 4.5L8.44757 5.94757L7 6.61839L8.44757 7.28922Z" fill="#202122" />
                        <path d="M8.44757 18.2892L9.11839 19.7368L9.78922 18.2892L11.2368 17.6184L9.78922 16.9476L9.11839 15.5L8.44757 16.9476L7 17.6184L8.44757 18.2892Z" fill="#202122" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Ask WikiPal</div>
                    </div>
                  </div>
                  <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                    <div className="justify-center text-white text-xs font-bold ">PRO</div>
                  </div>
                </div>
                <div data-property-1="Default" className="size- inline-flex justify-start items-start">
                  <div data-property-1="Default" className="w-64 self-stretch p-1.5 rounded-md flex justify-start items-center gap-1.5">
                    <div className="size- flex justify-start items-center gap-1.5">
                      <div data-svg-wrapper data-property-1="Save" className="relative">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.4286 5.5H8.57143C7.70714 5.5 7 6.2 7 7.05556V19.5L12.5 17.1667L18 19.5V7.05556C18 6.2 17.2929 5.5 16.4286 5.5ZM16.4286 17.1667L12.5 15.4711L8.57143 17.1667V7.83333C8.57143 7.40556 8.925 7.05556 9.35714 7.05556H15.6429C16.075 7.05556 16.4286 7.40556 16.4286 7.83333V17.1667Z" fill="#636C7E" />
                        </svg>
                      </div>
                      <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                        <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Save Article</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Watch" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.1495 9.52037L14.6253 9.13542L12.8586 5.0568C12.5408 4.3144 11.4565 4.3144 11.1387 5.0568L9.37198 9.14459L4.85713 9.52037C4.03455 9.58453 3.69804 10.5927 4.32432 11.1243L7.75486 14.0389L6.72663 18.365C6.53968 19.1533 7.409 19.7765 8.11941 19.3549L11.9986 17.0635L15.8779 19.3641C16.5883 19.7857 17.4576 19.1624 17.2706 18.3742L16.2424 14.0389L19.6729 11.1243C20.2992 10.5927 19.9721 9.58453 19.1495 9.52037ZM11.9986 15.3496L8.48396 17.4302L9.41872 13.5073L6.31534 10.8677L10.4096 10.5194L11.9986 6.82573L13.5971 10.5286L17.6913 10.8769L14.5879 13.5165L15.5226 17.4393L11.9986 15.3496Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Watch changes</div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Link" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4401 8.5H13.7521C13.2593 8.5 12.8561 8.9032 12.8561 9.39601C12.8561 9.88881 13.2593 10.292 13.7521 10.292H16.4401C17.9185 10.292 19.1281 11.5016 19.1281 12.98C19.1281 14.4585 17.9185 15.6681 16.4401 15.6681H13.7521C13.2593 15.6681 12.8561 16.0713 12.8561 16.5641C12.8561 17.0569 13.2593 17.4601 13.7521 17.4601H16.4401C18.9131 17.4601 20.9202 15.453 20.9202 12.98C20.9202 10.5071 18.9131 8.5 16.4401 8.5ZM8.37605 12.98C8.37605 13.4728 8.77925 13.876 9.27206 13.876H14.6481C15.1409 13.876 15.5441 13.4728 15.5441 12.98C15.5441 12.4872 15.1409 12.084 14.6481 12.084H9.27206C8.77925 12.084 8.37605 12.4872 8.37605 12.98ZM10.1681 15.6681H7.48004C6.00163 15.6681 4.79202 14.4585 4.79202 12.98C4.79202 11.5016 6.00163 10.292 7.48004 10.292H10.1681C10.6609 10.292 11.0641 9.88881 11.0641 9.39601C11.0641 8.9032 10.6609 8.5 10.1681 8.5H7.48004C5.00706 8.5 3 10.5071 3 12.98C3 15.453 5.00706 17.4601 7.48004 17.4601H10.1681C10.6609 17.4601 11.0641 17.0569 11.0641 16.5641C11.0641 16.0713 10.6609 15.6681 10.1681 15.6681Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Permanent link</div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Short link" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0579 7.65795L11.2697 9.44609C10.9419 9.77391 10.9419 10.3104 11.2697 10.6382C11.5976 10.966 12.134 10.966 12.4618 10.6382L14.25 8.85004C15.2334 7.86657 16.8428 7.86657 17.8262 8.85004C18.8097 9.83352 18.8097 11.4428 17.8262 12.4263L16.0381 14.2145C15.7103 14.5423 15.7103 15.0787 16.0381 15.4065C16.3659 15.7344 16.9024 15.7344 17.2302 15.4065L19.0183 13.6184C20.6634 11.9733 20.6634 9.30303 19.0183 7.65795C17.3732 6.01286 14.703 6.01286 13.0579 7.65795ZM10.6737 16.0026C11.0015 16.3304 11.538 16.3304 11.8658 16.0026L15.4421 12.4263C15.7699 12.0985 15.7699 11.562 15.4421 11.2342C15.1142 10.9064 14.5778 10.9064 14.25 11.2342L10.6737 14.8105C10.3459 15.1383 10.3459 15.6748 10.6737 16.0026ZM13.6539 16.5986L11.8658 18.3868C10.8823 19.3702 9.27298 19.3702 8.28951 18.3868C7.30603 17.4033 7.30603 15.794 8.28951 14.8105L10.0776 13.0224C10.4055 12.6945 10.4055 12.1581 10.0776 11.8303C9.74982 11.5024 9.21338 11.5024 8.88555 11.8303L7.09742 13.6184C5.45233 15.2635 5.45233 17.9338 7.09742 19.5789C8.7425 21.2239 11.4128 21.2239 13.0579 19.5789L14.846 17.7907C15.1738 17.4629 15.1738 16.9265 14.846 16.5986C14.5182 16.2708 13.9817 16.2708 13.6539 16.5986Z" fill="#636C7E" />
                        <path d="M4.51102 7.39787L5.67466 9.90888L6.8383 7.39787L9.34931 6.23423L6.8383 5.07059L5.67466 2.55957L4.51102 5.07059L2 6.23423L4.51102 7.39787Z" fill="#636C7E" />
                        <path d="M10.8616 4.28922L11.5325 5.73679L12.2033 4.28922L13.6509 3.61839L12.2033 2.94757L11.5325 1.5L10.8616 2.94757L9.41406 3.61839L10.8616 4.28922Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Short link</div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Cite" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.62714 16.7875C8.0498 16.7875 8.43931 16.5472 8.62164 16.1742L9.79847 13.8206C9.91449 13.5885 9.9725 13.3399 9.9725 13.083V9.32875C9.9725 8.87294 9.59957 8.5 9.14375 8.5H5.82875C5.37294 8.5 5 8.87294 5 9.32875V12.6438C5 13.0996 5.37294 13.4725 5.82875 13.4725H7.48625L6.63264 15.1797C6.2597 15.9173 6.79839 16.7875 7.62714 16.7875ZM15.9146 16.7875C16.3373 16.7875 16.7268 16.5472 16.9091 16.1742L18.086 13.8206C18.202 13.5885 18.26 13.3399 18.26 13.083V9.32875C18.26 8.87294 17.8871 8.5 17.4313 8.5H14.1163C13.6604 8.5 13.2875 8.87294 13.2875 9.32875V12.6438C13.2875 13.0996 13.6604 13.4725 14.1163 13.4725H15.7738L14.9201 15.1797C14.5472 15.9173 15.0859 16.7875 15.9146 16.7875Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Cite this page</div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="QR" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.77778 11.6111H9.33333C10.3111 11.6111 11.1111 10.8111 11.1111 9.83333V6.27778C11.1111 5.3 10.3111 4.5 9.33333 4.5H5.77778C4.8 4.5 4 5.3 4 6.27778V9.83333C4 10.8111 4.8 11.6111 5.77778 11.6111ZM5.77778 6.27778H9.33333V9.83333H5.77778V6.27778Z" fill="#636C7E" />
                        <path d="M5.77778 20.4998H9.33333C10.3111 20.4998 11.1111 19.6998 11.1111 18.722V15.1664C11.1111 14.1887 10.3111 13.3887 9.33333 13.3887H5.77778C4.8 13.3887 4 14.1887 4 15.1664V18.722C4 19.6998 4.8 20.4998 5.77778 20.4998ZM5.77778 15.1664H9.33333V18.722H5.77778V15.1664Z" fill="#636C7E" />
                        <path d="M12.8906 6.27778V9.83333C12.8906 10.8111 13.6906 11.6111 14.6684 11.6111H18.224C19.2017 11.6111 20.0017 10.8111 20.0017 9.83333V6.27778C20.0017 5.3 19.2017 4.5 18.224 4.5H14.6684C13.6906 4.5 12.8906 5.3 12.8906 6.27778ZM18.224 9.83333H14.6684V6.27778H18.224V9.83333Z" fill="#636C7E" />
                        <path d="M20.0004 20.056V19.1671C20.0004 18.9182 19.8049 18.7227 19.556 18.7227H18.6671C18.4182 18.7227 18.2227 18.9182 18.2227 19.1671V20.056C18.2227 20.3049 18.4182 20.5004 18.6671 20.5004H19.556C19.8049 20.5004 20.0004 20.3049 20.0004 20.056Z" fill="#636C7E" />
                        <path d="M12.8906 13.8331V14.722C12.8906 14.9709 13.0862 15.1664 13.3351 15.1664H14.224C14.4728 15.1664 14.6684 14.9709 14.6684 14.722V13.8331C14.6684 13.5842 14.4728 13.3887 14.224 13.3887H13.3351C13.0862 13.3887 12.8906 13.5842 12.8906 13.8331Z" fill="#636C7E" />
                        <path d="M16.0013 15.167H15.1124C14.8635 15.167 14.668 15.3625 14.668 15.6114V16.5003C14.668 16.7492 14.8635 16.9448 15.1124 16.9448H16.0013C16.2502 16.9448 16.4457 16.7492 16.4457 16.5003V15.6114C16.4457 15.3625 16.2502 15.167 16.0013 15.167Z" fill="#636C7E" />
                        <path d="M12.8906 17.3888V18.2777C12.8906 18.5266 13.0862 18.7221 13.3351 18.7221H14.224C14.4728 18.7221 14.6684 18.5266 14.6684 18.2777V17.3888C14.6684 17.1399 14.4728 16.9443 14.224 16.9443H13.3351C13.0862 16.9443 12.8906 17.1399 12.8906 17.3888Z" fill="#636C7E" />
                        <path d="M15.1124 20.5004H16.0013C16.2502 20.5004 16.4457 20.3049 16.4457 20.056V19.1671C16.4457 18.9182 16.2502 18.7227 16.0013 18.7227H15.1124C14.8635 18.7227 14.668 18.9182 14.668 19.1671V20.056C14.668 20.3049 14.8635 20.5004 15.1124 20.5004Z" fill="#636C7E" />
                        <path d="M16.8898 18.7221H17.7786C18.0275 18.7221 18.2231 18.5266 18.2231 18.2777V17.3888C18.2231 17.1399 18.0275 16.9443 17.7786 16.9443H16.8898C16.6409 16.9443 16.4453 17.1399 16.4453 17.3888V18.2777C16.4453 18.5266 16.6409 18.7221 16.8898 18.7221Z" fill="#636C7E" />
                        <path d="M17.7786 13.3887H16.8898C16.6409 13.3887 16.4453 13.5842 16.4453 13.8331V14.722C16.4453 14.9709 16.6409 15.1664 16.8898 15.1664H17.7786C18.0275 15.1664 18.2231 14.9709 18.2231 14.722V13.8331C18.2231 13.5842 18.0275 13.3887 17.7786 13.3887Z" fill="#636C7E" />
                        <path d="M18.6671 16.9448H19.556C19.8049 16.9448 20.0004 16.7492 20.0004 16.5003V15.6114C20.0004 15.3625 19.8049 15.167 19.556 15.167H18.6671C18.4182 15.167 18.2227 15.3625 18.2227 15.6114V16.5003C18.2227 16.7492 18.4182 16.9448 18.6671 16.9448Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">QR Code</div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Download" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.02 16.1039C11.8863 16.1039 11.761 16.0829 11.6441 16.0408C11.5271 15.9993 11.4185 15.9285 11.3183 15.8283L7.70925 12.2193C7.52546 12.0355 7.43356 11.8015 7.43356 11.5175C7.43356 11.2335 7.52546 10.9995 7.70925 10.8158C7.89304 10.632 8.13097 10.5357 8.42303 10.527C8.71576 10.519 8.95402 10.6069 9.13781 10.7907L11.0175 12.6704V5.5025C11.0175 5.21846 11.1137 4.9802 11.3062 4.78772C11.498 4.59591 11.736 4.5 12.02 4.5C12.304 4.5 12.5423 4.59591 12.7348 4.78772C12.9266 4.9802 13.0225 5.21846 13.0225 5.5025V12.6704L14.9022 10.7907C15.086 10.6069 15.3242 10.519 15.617 10.527C15.909 10.5357 16.147 10.632 16.3307 10.8158C16.5145 10.9995 16.6064 11.2335 16.6064 11.5175C16.6064 11.8015 16.5145 12.0355 16.3307 12.2193L12.7218 15.8283C12.6215 15.9285 12.5129 15.9993 12.3959 16.0408C12.279 16.0829 12.1537 16.1039 12.02 16.1039ZM6.005 20.54C5.45363 20.54 4.98178 20.3438 4.58947 19.9515C4.19649 19.5586 4 19.0864 4 18.535V16.53C4 16.246 4.09591 16.0077 4.28772 15.8152C4.4802 15.6234 4.71846 15.5275 5.0025 15.5275C5.28654 15.5275 5.5248 15.6234 5.71728 15.8152C5.90909 16.0077 6.005 16.246 6.005 16.53V18.535H18.035V16.53C18.035 16.246 18.1312 16.0077 18.3237 15.8152C18.5155 15.6234 18.7535 15.5275 19.0375 15.5275C19.3215 15.5275 19.5595 15.6234 19.7513 15.8152C19.9438 16.0077 20.04 16.246 20.04 16.53V18.535C20.04 19.0864 19.8438 19.5586 19.4515 19.9515C19.0586 20.3438 18.5864 20.54 18.035 20.54H6.005Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Download PDF</div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Print" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.1469 8.95496H5.67297C4.19393 8.95496 3 10.1489 3 11.6279V15.1919C3 16.172 3.80189 16.9739 4.78198 16.9739H6.56396V18.7559C6.56396 19.7359 7.36586 20.5378 8.34595 20.5378H15.4739C16.454 20.5378 17.2559 19.7359 17.2559 18.7559V16.9739H19.0378C20.0179 16.9739 20.8198 16.172 20.8198 15.1919V11.6279C20.8198 10.1489 19.6259 8.95496 18.1469 8.95496ZM14.5829 18.7559H9.23694C8.74689 18.7559 8.34595 18.3549 8.34595 17.8649V14.3009H15.4739V17.8649C15.4739 18.3549 15.0729 18.7559 14.5829 18.7559ZM18.1469 12.5189C17.6568 12.5189 17.2559 12.118 17.2559 11.6279C17.2559 11.1379 17.6568 10.7369 18.1469 10.7369C18.6369 10.7369 19.0378 11.1379 19.0378 11.6279C19.0378 12.118 18.6369 12.5189 18.1469 12.5189ZM16.3649 4.5H7.45496C6.96491 4.5 6.56396 4.90095 6.56396 5.39099V7.17297C6.56396 7.66302 6.96491 8.06396 7.45496 8.06396H16.3649C16.8549 8.06396 17.2559 7.66302 17.2559 7.17297V5.39099C17.2559 4.90095 16.8549 4.5 16.3649 4.5Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Printable version</div>
                    </div>
                  </div>
                </div>
                <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div data-svg-wrapper data-property-1="Info" className="relative">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.65 8.6C11.65 8.13056 12.0306 7.75 12.5 7.75C12.9694 7.75 13.35 8.13056 13.35 8.6C13.35 9.06944 12.9694 9.45 12.5 9.45C12.0306 9.45 11.65 9.06944 11.65 8.6ZM12.5 16.25C12.9675 16.25 13.35 15.8675 13.35 15.4V12C13.35 11.5325 12.9675 11.15 12.5 11.15C12.0325 11.15 11.65 11.5325 11.65 12V15.4C11.65 15.8675 12.0325 16.25 12.5 16.25ZM12.5 3.5C7.808 3.5 4 7.308 4 12C4 16.692 7.808 20.5 12.5 20.5C17.192 20.5 21 16.692 21 12C21 7.308 17.192 3.5 12.5 3.5ZM12.5 18.8C8.7515 18.8 5.7 15.7485 5.7 12C5.7 8.2515 8.7515 5.2 12.5 5.2C16.2485 5.2 19.3 8.2515 19.3 12C19.3 15.7485 16.2485 18.8 12.5 18.8Z" fill="#636C7E" />
                      </svg>
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Page information</div>
                    </div>
                  </div>
                </div>
              </div>
              <div data-svg-wrapper className="left-0 top-[36px] absolute">
                <svg width="253" height="2" viewBox="0 0 253 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1H255" stroke="#D3D5D9" />
                </svg>
              </div>
            </div>
            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
              <div className="size- flex justify-start items-center gap-1.5">
                <div data-svg-wrapper data-property-1="Minus" className="relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.71875 12H16.9988" stroke="#636C7E" stroke-width="1.89438" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END RIGHT SIDEBAR */}





      {children}





      {/* LEFT SIDE BAR */}
      <div className="w-64 h-[2476px] left-[160px] top-[159px] absolute overflow-hidden">
        <div className="w-64 h-[748px] left-0 top-[-84px] absolute overflow-hidden">
          <div className="size- left-0 top-[84px] absolute inline-flex flex-col justify-start items-start gap-5">

            <div data-property-1="Default" className="w-64 h-[481px] relative overflow-hidden">
              <div className="w-64 left-0 top-0 absolute inline-flex justify-between items-start">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
                  <div className="self-stretch h-9 py-[5px] inline-flex justify-start items-center gap-2.5">
                    <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Minus" className="relative">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.71875 12H16.9988" stroke="#636C7E" stroke-width="1.89438" stroke-linecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="justify-start text-neutral-800 text-sm font-bold ">Top-level articles</div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
                    <div className="self-stretch inline-flex justify-between items-start">
                      <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Extant Carnivora species</div>
                      <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-56 inline-flex justify-between items-start">
                      <div className="justify-start text-neutral-800 text-sm font-bold  leading-normal">Cats</div>
                      <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-52 inline-flex justify-between items-start">
                      <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Breeds</div>
                      <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">American curl</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-neutral-800" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">Sphynx</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">German Rex</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                    <div className="w-52 inline-flex justify-between items-start">
                      <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Felinology</div>
                      <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Anatomy</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-neutral-800" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">Genetics</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">Kitten</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">Calico cat</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <div data-svg-wrapper className="left-0 top-[36px] absolute">
                  <svg width="255" height="2" viewBox="0 0 255 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1H255" stroke="#D3D5D9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END LEFT SIDE BAR */}
    </div>
  );
}
