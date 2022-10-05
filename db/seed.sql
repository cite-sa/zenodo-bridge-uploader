CREATE TABLE public.deposit (
    id uuid NOT NULL,
    deposit_metadata character varying,
    status smallint NOT NULL,
    access_token character varying,
    title character varying,
    description character varying,
    doi character varying,
    files character varying,
    created_at timestamp without time zone,
    file_urls character varying,
    read_only_fields character varying,
    refresh_token character varying,
    hidden_fields character varying
);

CREATE TABLE public.deposit_webdav_files (
    id uuid NOT NULL,
    deposit_id uuid,
    url character varying,
    username character varying,
    password character varying,
    is_optional character varying
);

ALTER TABLE ONLY public.deposit
    ADD CONSTRAINT deposit_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.deposit_webdav_files
    ADD CONSTRAINT deposit_webdav_files_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.deposit_webdav_files
    ADD CONSTRAINT id FOREIGN KEY (deposit_id) REFERENCES public.deposit(id);
