<script setup>
import FooterView from '@/components/FooterView.vue'
import HeaderView from '@/components/HeaderView.vue'

const EMAIL = 'compliance@paratusdwellings.co.uk'
const WEBSITE = 'https://paratusdwellings.co.uk'
</script>

<template>
  <div class="font-sans text-slate-700 bg-white overflow-x-hidden scroll-smooth">

    <!-- PAGE HEADER -->
    <section class="relative bg-gradient-to-br from-[#061a3a] via-[#0A2A5C] to-[#12418a] pt-40 pb-16 px-5 overflow-hidden">
      <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#A8E80F]/20 blur-3xl"></div>
      <div class="relative max-w-3xl mx-auto">
        <a href="/" class="text-sm font-semibold text-[#A8E80F] hover:underline"><i class="fa-solid fa-arrow-left mr-2"></i>Back to Home</a>
        <h1 data-aos="fade-up" class="mt-5 text-4xl sm:text-5xl font-extrabold text-white leading-tight">Privacy Policy</h1>
        <p data-aos="fade-up" data-aos-delay="100" class="mt-4 text-slate-300">Paratus Dwellings · Last updated: 16 October 2026</p>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-16 px-5">
      <article class="policy max-w-3xl mx-auto" data-aos="fade-up">
        <h2>Introduction</h2>
        <p>Paratus Dwellings respects your privacy and protects personal information in accordance with applicable UK data protection law, including the UK GDPR and the Data Protection Act 2018, as amended.</p>
        <p>This policy explains how we collect, use, store and share personal information when you visit our website, contact us, make an accommodation enquiry, submit a referral or engage with our services.</p>

        <h2>Information we collect</h2>
        <p>Depending on your interaction with us, we might collect:</p>
        <ul>
          <li>Names and contact details.</li>
          <li>Information submitted through website forms or emails.</li>
          <li>Accommodation enquiries and referral information.</li>
          <li>Relevant housing and support requirements.</li>
          <li>Support plans, key-work records and progress notes for residents.</li>
          <li>Safeguarding information where necessary.</li>
          <li>Website usage information, device information and IP addresses.</li>
          <li>Recruitment information where you apply for a role with us.</li>
        </ul>
        <p>Please avoid submitting sensitive personal information through general website forms unless we have provided an appropriate secure method.</p>

        <h2>How we use your information</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Respond to enquiries and requests.</li>
          <li>Assess accommodation enquiries and referrals.</li>
          <li>Coordinate housing arrangements and support services.</li>
          <li>Maintain appropriate resident and support records.</li>
          <li>Respond to safeguarding concerns.</li>
          <li>Communicate with authorised professionals and relevant organisations.</li>
          <li>Maintain website security and prevent misuse.</li>
          <li>Meet legal obligations and resolve complaints.</li>
        </ul>

        <h2>Lawful basis for processing</h2>
        <p>We process personal information where an appropriate lawful basis applies. Depending on the circumstances, this might include contractual necessity, legal obligations, legitimate interests, consent or protection of vital interests.</p>
        <p>Where we process sensitive personal information or criminal offence data, we will also satisfy the additional legal requirements applicable to such processing.</p>

        <h2>Sharing your information</h2>
        <p>Where necessary and lawful, we might share relevant information with local authorities, referral agencies, landlords, safeguarding professionals, emergency services, professional advisers and technology providers supporting our operations.</p>
        <p>We do not sell personal information.</p>
        <p>We share information only where an appropriate legal basis exists and apply suitable confidentiality and security safeguards.</p>

        <h2>Data security and retention</h2>
        <p>We apply appropriate technical and organisational measures to protect personal information from unauthorised access, loss, alteration or disclosure.</p>
        <p>We retain information only for as long as necessary for its intended purpose, taking account of applicable legal obligations, safeguarding requirements and documented retention periods. Records are securely deleted or anonymised when no longer required, unless continued retention is legally justified or required.</p>

        <h2>Your privacy rights</h2>
        <p>Subject to applicable legal conditions, you have rights to:</p>
        <ul>
          <li>Access your personal information.</li>
          <li>Correct inaccurate information.</li>
          <li>Request deletion of information.</li>
          <li>Restrict certain processing.</li>
          <li>Object to certain processing activities.</li>
          <li>Request data portability where applicable.</li>
          <li>Withdraw consent where processing relies on consent.</li>
        </ul>
        <p>To exercise your rights, contact <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>. We might need to verify your identity before responding.</p>

        <h2>International transfers</h2>
        <p>Where our technology providers process personal information outside the United Kingdom, we will apply appropriate safeguards in accordance with applicable law.</p>

        <h2>Complaints about personal information</h2>
        <p>If you are concerned about how we handle your personal information, contact us first.</p>
        <p>You also have the right to complain to the Information Commissioner's Office (ICO).</p>
        <p>
          Website: <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer">https://ico.org.uk/</a><br />
          Telephone: <a href="tel:03031231113">0303 123 1113</a>
        </p>

        <!-- CONTACT CARD -->
        <div class="mt-14 rounded-3xl bg-slate-50 border-t-4 border-[#A8E80F] p-8">
          <h2 class="!mt-0">Contact Paratus Dwellings</h2>
          <p>For safeguarding concerns, privacy requests, cookie enquiries, complaints or general information, contact:</p>
          <p class="!mt-3">
            <strong class="text-[#0A2A5C]">Paratus Dwellings</strong><br />
            Email: <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a><br />
            Website: <a :href="WEBSITE" target="_blank" rel="noopener noreferrer">{{ WEBSITE }}</a>
          </p>
          <p>We are committed to protecting privacy, promoting safety and treating everyone who engages with our services fairly and respectfully.</p>
        </div>

        <p class="mt-8 text-sm text-slate-500">Document review: These policies should be reviewed regularly and updated whenever our services, legal obligations or website technologies change.</p>
      </article>
    </section>

  </div>
</template>

<style scoped>
.policy h2 { margin-top: 2.5rem; font-size: 1.5rem; font-weight: 800; line-height: 1.3; color: #0A2A5C; }
.policy h2:first-child { margin-top: 0; }
.policy h3 { margin-top: 1.75rem; font-size: 1.15rem; font-weight: 800; color: #0A2A5C; }
.policy p { margin-top: 1rem; line-height: 1.75; }
.policy ul { margin-top: 1rem; display: grid; gap: 0.6rem; }
.policy li { position: relative; padding-left: 1.75rem; line-height: 1.7; }
.policy li::before { content: ''; position: absolute; left: 0; top: 0.65rem; width: 0.6rem; height: 0.6rem; border-radius: 9999px; background: #A8E80F; }
.policy a { color: #0A2A5C; font-weight: 700; text-decoration: underline; text-decoration-color: #A8E80F; text-underline-offset: 3px; word-break: break-word; }
.policy a:hover { background: #A8E80F; }
</style>